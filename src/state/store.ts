import { loadHomePage } from "..";
import { Country } from "../services/model.types";

export type Action = {
  type: string;
  payload?: any;
};

export type State = {
  Countries: Country[];
  error: any;
};

export class Store {
  static initialState: State = {
    Countries: [],
    error: null,
  };

  static dispatch = (type: string, payload?: any) => {
    const action: Action = {
      type,
      payload,
    };
    const prevState = this.initialState;
    this.reducer(prevState, action);
  };

  static reducer = (initialState: State, action: Action) => {
    switch (action.type) {
      case "FETCH_ALL_COUNTRIES":
        this.initialState = {
          ...initialState,
          Countries: action.payload,
        };

        loadHomePage();
        break;

      default:
        break;
    }
  };

  static getCountries = () => {
    return this.initialState.Countries;
  };
}
