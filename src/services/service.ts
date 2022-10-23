import { BASE_URL } from "./base.url";

export class Service {
  static fetchAllCountries = async () => {
    return await fetch(`${BASE_URL}/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  static fetchCountryByCode = async (code: string) => {
    return await fetch(`${BASE_URL}/alpha/${code}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  static filterCountriesByRegion = async (region: string) => {
    return await fetch(`${BASE_URL}/subregion/${region}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}
