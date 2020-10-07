/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// actions
import {
  ACTIONS, // please update this and add more if necessary
} from "../actions";

import { websites } from "../../mockData";

/* ========== ~~~~~~~~~~ DROPDOWN STATUS : REDUCER ~~~~~~~~~~ ========== */
// DEFAULT STATE
const defaultState = {
  initialData: [],
  filteredData: [],
};

// REDUCER
export const dropdownStatus = (state = defaultState, action) => {
  switch (action.type) {
    case ACTIONS.GET_WEBSITES:
      return {
        ...state,
        initialData: websites,
      };
    case ACTIONS.FILTER_VALUES:
      return { ...state, filteredData: action.data };
    default:
      return state;
  }
};
