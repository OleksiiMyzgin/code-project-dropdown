/* ++++++++++ --------------- IMPORTS --------------- ++++++++++ */
// libraries
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { enableBatching } from 'redux-batched-actions';
import thunk from 'redux-thunk';
// reducers
import { rootReducer } from '../reducers/root';



// .......... STORE HELPERS .......... //
const enhancers = [];
const middleware = [
    thunk, // used for asynchronous actions
    routerMiddleware()
];

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);



/* ========== ~~~~~~~~~~ STORE (application state) ~~~~~~~~~~ ========== */
const store = createStore(
    enableBatching(rootReducer),
    composedEnhancers,
);



/* ++++++++++ --------------- EXPORTS --------------- ++++++++++ */
export default store;
