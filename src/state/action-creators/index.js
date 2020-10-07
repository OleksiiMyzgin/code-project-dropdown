import { ACTIONS } from "../actions";
import { websites } from "../../mockData";

/* ++++++++++ --------------- EXPORTS --------------- ++++++++++ */
export const getWebsites = () => ({
  type: ACTIONS.GET_WEBSITES,
  data: websites,
});

export const filterValues = (payload) => ({
  type: ACTIONS.FILTER_VALUES,
  data: payload,
});
