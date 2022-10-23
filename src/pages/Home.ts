import { Country } from "../services/model.types";
import { Service } from "../services/service";
import { Store } from "../state/store";
import Swal from "sweetalert2";
import { numberWithCommas } from "../utils/numberFormatter";
import { CountryLoader } from "../components/countryLoader";

export const Home = () => {
  const countriesList: Country[] = Store.getCountries();

  const countryListCards = () => {
    let countryHtmlText = "";
    if (countriesList.length) {
      countriesList.forEach((country) => {
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
      return countryHtmlText;
    } else {
      return CountryLoader();
    }
  };
  return `<section
  class="flex flex-col sm:flex-col md:flex-row items-center justify-center sm:justify-center md:justify-between mt-[100px] py-5"
>
  <div
    class="form-group w-[80%] sm:w-[80%] md:w-[30%] shadow-lg hover:shadow-xl"
  >
    <div class="input-group flex items-center p-4 rounded-none bg-white dark:bg-baseDark2 text-gray-800 dark:text-slate-100">
      <span class="mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        
      </span>
      <input
        type="text"
        placeholder="Search for a country..."
        class="focus:outline-none active:outline-none bg-transparent"
      />
    </div>
  </div>

  <div class="dropdown relative mt-4 sm:mt-4 md:mt-0">
    <button
      class="btn-custom flex items-center justify-between shadow-lg hover:shadow-xl p-4 w-[200px] bg-white dark:bg-baseDark2 text-gray-800 dark:text-slate-100"
      type="button"
    >
      <span>Filter by Region</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>

      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>

    </button>
    <ul
      class="dropdown-menu hidden absolute py-2 px-3 bg-white dark:bg-baseDark2 text-gray-800 dark:text-slate-100 shadow-lg top-[62px] min-w-[200px]"
    >
      <li class="dropdown-item" id="All">All</li>
      <li class="dropdown-item" id="Africa">Africa</li>
      <li class="dropdown-item" id="America">America</li>
      <li class="dropdown-item" id="Asia">Asia</li>
      <li class="dropdown-item" id="Europe">Europe</li>
      <li class="dropdown-item" id="Oceania">Oceania</li>
    </ul>
  </div>
</section>

<section
  class="countries-list grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 mt-[30px]"
>
${countryListCards()}

</section>`;
};

const initialize = async () => {
  const response = await Service.fetchAllCountries();
  if (response.status === 200) {
    response.json().then((countries) => {
      console.log(typeof countries);
      getCountries(countries);
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Ooops! An Error Has Occured",
      text: response.statusText,
    });
  }
};

export const getCountries = (countries: any[]) => {
  console.log(countries);
  const formatedCountries = countries.map((country) => {
    let formatedCurrencies = [];
    if (country.currencies) {
      for (let key in country.currencies) {
        formatedCurrencies.push({
          currency: key,
          name: country.currencies[key].name,
          symbol: country.currencies[key].symbol,
        });
      }
    }
    return {
      name: country.name.common,
      nativeName: country.name.nativeName
        ? Object.values(country.name.nativeName)[0]["official"]
        : "Not Available",
      navAbbr: country.cca3,
      region: country.region,
      subRegion: country.subregion,
      capital: country.capital ? country.capital[0] : "Not Available",
      population: country.population,
      topLevelDomain: country.tld ? country.tld[0] : "Not Available",
      currencies: formatedCurrencies,
      flag: country.flags.svg,
      languages: country.languages ? Object.values(country.languages) : [],
      borderCountries: country.borders,
      map: country.maps.googleMaps,
    };
  });

  Store.dispatch("FETCH_ALL_COUNTRIES", formatedCountries);
};

initialize();
