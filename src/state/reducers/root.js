/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// libraries
import { combineReducers } from 'redux';
// reducers
import { dropdownStatus } from './dropdownstatus';



/* ========== ~~~~~~~~~~ ROOT REDUCER ~~~~~~~~~~ ========== */
// used to combine all various reducers together into an easily accesible object
export const rootReducer = combineReducers({
    dropdownStatus
});
