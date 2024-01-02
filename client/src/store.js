// redux.js
import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import formReducer from "./Components/sigup.duck";
// Combine reducers
const rootReducer = combineReducers({
  formReducer,
  // Add more reducers as needed
});
const middleware = [thunk];
// Create Redux store
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
