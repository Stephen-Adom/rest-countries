export type Country = {
  name: string;
  nativeName: string;
  navAbbr: string;
  region: string;
  subRegion: string;
  capital: string;
  population: number;
  topLevelDomain: string;
  currencies?: Currency[];
  flag: string;
  languages: string[];
  borderCountries: string[];
  map: string;
};

export type Currency = {
  currency: string;
  name: string;
  symbol: string;
};
