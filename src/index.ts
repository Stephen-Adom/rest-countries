import "./assets/index.css";
import Swal from "sweetalert2";
import { Wrapper } from "./components/wrapper";
import { Details } from "./pages/Details";
import { getCountries, Home } from "./pages/Home";
import { Country } from "./services/model.types";
import { Service } from "./services/service";
import "./state/store";
import { Store } from "./state/store";
import { fromEvent, debounceTime } from "rxjs";
import { numberWithCommas } from "./utils/numberFormatter";

const root = document.querySelector("#root");
root.innerHTML = Wrapper();

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
  localStorage.theme = "dark";
  document.documentElement.classList.add("dark");
} else {
  localStorage.theme = "light";
  document.documentElement.classList.add("light");
}

const themeButton = document.querySelector(".themeBtn");

window.addEventListener("DOMContentLoaded", () => {
  loadHomePage();
});

export const loadHomePage = () => {
  const wrapperElement = document.querySelector(".wrapper");
  wrapperElement.innerHTML = Home();
  bindClickEventToCountry();
};

export const renderCountryListOnHomePage = () => {
  const countriesList: Country[] = Store.getCountries();
  const countryListElement = document.querySelector(".countries-list");
  let countryHtmlText = "";
  console.log(countryListElement);

  if (countriesList.length) {
    countriesList.forEach((country) => {
      const html = `<div class="country-item card">
        <img
          src=${country.flag}
          class="w-full"
          alt=${country.name}
        />
        <div class="card-body">
          <h2 class="font-extrabold text-2xl mb-5">${country.name}</h2>
          <ul>
            <li>
              <span>Population:</span>
              <span>${country.population}</span>
            </li>
            <li>
              <span>Region:</span>
              <span>${country.region}</span>
            </li>
            <li>
              <span>Capital:</span>
              <span>${country.capital}</span>
            </li>
          </ul>
        </div>
      </div>`;

      countryHtmlText += html;
    });

    countryListElement.innerHTML = countryHtmlText;
  }
};

export const bindClickEventToCountry = () => {
  const countriesList: Country[] = Store.getCountries();
  let selectedCountryName = "";

  if (countriesList.length) {
    const countryListCardElements = document.querySelectorAll(".country-item");
    countryListCardElements.forEach((cardElement) => {
      cardElement.addEventListener("click", (event) => {
        if (event.target["classList"].contains("image-container")) {
          selectedCountryName = event.target["parentNode"].getAttribute("id");
        } else if (event.target["classList"].contains("countryName")) {
          selectedCountryName =
            event.target["parentNode"]["parentNode"].getAttribute("id");
        }

        filterSelected(selectedCountryName, countriesList);
      });
    });
  }

  const dropdownButtonElement = document.querySelector(".dropdown button");
  dropdownButtonElement.addEventListener("click", (e) => {
    console.log(dropdownButtonElement.children);
    const dropdownMenu = document.querySelector(".dropdown-menu");
    dropdownMenu.classList.toggle("hidden");
    if (!dropdownMenu.classList.contains("hidden")) {
      const filterLists = document.querySelectorAll(".dropdown-menu li");
      filterLists.forEach((filterList) => {
        filterList.addEventListener("click", (e) => {
          const li: any = e.target;
          const filterId = li.getAttribute("id");
          dropdownButtonElement.children[0].textContent = filterId;
          dropdownButtonElement.children[1].classList.add("hidden");
          dropdownButtonElement.children[2].classList.remove("hidden");
          filterCountryByRegion(filterId);
        });
      });
    }
  });

  const searchInputElement = document.querySelector(
    ".form-group .input-group input"
  );

  fromEvent(searchInputElement, "keyup")
    .pipe(debounceTime(600))
    .subscribe((data) => {
      countryListSearchFilter(data.target["value"]);
    });
};

const countryListSearchFilter = (search: string) => {
  const countryListContainer = document.querySelector(".countries-list");
  const countriesList: Country[] = Store.getCountries();

  if (countriesList.length) {
    let countryHtmlText = "";
    const searchResult = countriesList.filter((country) =>
      country.name.toLowerCase().startsWith(search.toLowerCase())
    );

    searchResult.forEach((country) => {
      const html = `<div class="country-item card" id=${country.name}>
      <div class="image-container" style="background-image: url(${
        country.flag
      })"></div> 

      <div class="card-body">
        <h2 class="font-extrabold text-2xl mb-5 countryName">${
          country.name
        }</h2>
        <ul>
          <li>
            <span>Population:</span>
            <span>${numberWithCommas(country.population)}</span>
          </li>
          <li>
            <span>Region:</span>
            <span>${country.region}</span>
          </li>
          <li>
            <span>Capital:</span>
            <span>${country.capital}</span>
          </li>
        </ul>
      </div>
    </div>`;

      countryHtmlText += html;
    });

    countryListContainer.innerHTML = countryHtmlText;

    bindClickEventToCountry();
  }
};

const filterCountryByRegion = async (filterId: string) => {
  const response =
    filterId === "All"
      ? await Service.fetchAllCountries()
      : await Service.filterCountriesByRegion(filterId);

  if (response.status === 200) {
    response.json().then((countries) => {
      const dropdownButtonElement = document.querySelector(".dropdown button");
      dropdownButtonElement.children[1].classList.remove("hidden");
      dropdownButtonElement.children[2].classList.add("hidden");
      getCountries(countries);
    });
  } else {
    const dropdownButtonElement = document.querySelector(".dropdown button");
    dropdownButtonElement.children[1].classList.remove("hidden");
    dropdownButtonElement.children[2].classList.add("hidden");
    Swal.fire({
      icon: "error",
      title: "Ooops! An Error Has Occured",
      text: response.statusText,
    });
  }
};

const filterSelected = (
  selectedCountryName: string,
  countriesList: Country[]
) => {
  const countryInfo = countriesList.find(
    (country) => country.name.split(" ")[0] === selectedCountryName
  );
  console.log(countryInfo);
  showDetailsPage(countryInfo);
};

const showDetailsPage = (countryInfo: Country) => {
  const wrapperElement = document.querySelector(".wrapper");
  wrapperElement.innerHTML = Details(countryInfo);
  CountryDetailPageEventListener();
};

const CountryDetailPageEventListener = () => {
  const backButtonElement = document.querySelector(".backButton");
  const borderCountryElement = document.querySelectorAll(".border-country");

  backButtonElement.addEventListener("click", (e) => {
    loadHomePage();
  });

  if (borderCountryElement && borderCountryElement.length) {
    borderCountryElement.forEach((borderElement) => {
      borderElement.addEventListener("click", (e) => {
        const countryNativeName = borderElement.getAttribute("id");
        getCountryInfo(countryNativeName);
      });
    });
  }
};

const getCountryInfo = async (nativeName: string) => {
  const response = await Service.fetchCountryByCode(nativeName);
  if (response.status === 200) {
    response.json().then((country) => {
      formatCountry(country);
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Ooops! An Error Has Occured",
      text: response.statusText,
    });
  }
};

const formatCountry = (country: any[]) => {
  let formatedCurrencies = [];
  if (country[0].currencies) {
    for (let key in country[0].currencies) {
      formatedCurrencies.push({
        currency: key,
        name: country[0].currencies[key].name,
        symbol: country[0].currencies[key].symbol,
      });
    }
  }
  const formatedCountry: Country = {
    name: country[0].name.common,
    nativeName: country[0].name.nativeName
      ? Object.values(country[0].name.nativeName)[0]["official"]
      : "Not Available",
    navAbbr: country[0].cca3,
    region: country[0].region,
    subRegion: country[0].subregion,
    capital: country[0].capital ? country[0].capital[0] : "Not Available",
    population: country[0].population,
    topLevelDomain: country[0].tld ? country[0].tld[0] : "Not Available",
    currencies: formatedCurrencies,
    flag: country[0].flags.svg,
    languages: country[0].languages ? Object.values(country[0].languages) : [],
    borderCountries: country[0].borders,
    map: country[0].maps.googleMaps,
  };

  console.log(formatedCountry, "formatedCountry");
  showDetailsPage(formatedCountry);
};

themeButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
  } else {
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
  }
});
