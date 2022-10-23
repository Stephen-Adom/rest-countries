import { Country } from "../services/model.types";
import { numberWithCommas } from "../utils/numberFormatter";

export const Details = (countryInfo: Country) => {
  const getLanguanges = () => {
    if (countryInfo && countryInfo.languages) {
      let languagesHtml = "";
      countryInfo.languages.forEach((language) => {
        const html = `<span class="font-medium">${language}</span>`;
        languagesHtml += html;
      });

      return languagesHtml;
    } else {
      return `<span>Not Available</span>`;
    }
  };

  const getCurrencies = () => {
    if (countryInfo && countryInfo.currencies) {
      let currenciesHtml = "";
      countryInfo.currencies.forEach((currency) => {
        const html = `<span class="font-medium">${currency.name}</span>`;
        currenciesHtml += html;
      });

      return currenciesHtml;
    } else {
      return `<span>Not Available</span>`;
    }
  };

  const getborderCountries = () => {
    if (countryInfo && countryInfo.borderCountries) {
      let bordersHtml = "";
      countryInfo.borderCountries.forEach((border) => {
        const html = `<span class="border-country" id=${border}>${border}</span>`;
        bordersHtml += html;
      });

      return bordersHtml;
    } else {
      return `<span>Not Available</span>`;
    }
  };

  return `<section class="py-5 detailsPage px-3 sm:px-3 md:px-10">
  <div class="">
    <button
      type="button"
      class="bg-white dark:bg-baseDark2 text-gray-800 dark:text-slate-100 px-7 py-2 rounded-md shadow-lg flex items-center backButton"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-4 h-4 mr-2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
        />
      </svg>

      Back
    </button>
  </div>

  <div
    class="country-detail-content grid gap-10 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mt-10"
  >
    <div
      class="image-container"
      style="background-image: url(${countryInfo.flag})"
    ></div>

    <div class="country-details text-gray-800 dark:text-slate-100">
      <div class="flex items-center">
        <h1 class="text-3xl font-extrabold mr-2">${countryInfo.name}</h1>
        <a href=${countryInfo.map} target="_blank">
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
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>
        </a>
      </div>

      <ul
        class="list-group grid gap-y-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mt-5"
      >
        <li class="list-group-item">
          <span>Native Name:</span>
          <span>${countryInfo.nativeName}</span>
        </li>
        <li class="list-group-item">
          <span>Top Level Domain:</span>
          <span>${countryInfo.topLevelDomain}</span>
        </li>
        <li class="list-group-item">
          <span>Population:</span>
          <span>${numberWithCommas(countryInfo.population)}</span>
        </li>
        <li class="list-group-item">
          <span>Currencies:</span>
          <span>${getCurrencies()}</span>
        </li>
        <li class="list-group-item">
          <span>Region:</span>
          <span>${countryInfo.region}</span>
        </li>
        <li class="list-group-item">
          <span>Languages:</span>
          <div>
            ${getLanguanges()}
          </div>
        </li>
        <li class="list-group-item">
          <span>Sub Region:</span>
          <span>${countryInfo.subRegion}</span>
        </li>
        <li class="list-group-item">
          <span>Capital:</span>
          <span>${countryInfo.capital}</span>
        </li>
      </ul>

      <div class="border-countries-list flex items-center mt-10">
        <h5 class="mr-5">Border Countries:</h5>
        <div
          class="border-country-list-container flex items-center flex-wrap gap-3"
        >
          ${getborderCountries()}
        </div>
      </div>
    </div>
  </div>
</section>`;
};
