// src/reducers/index.js

import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  categories: categoryReducer, // Ensure this matches your selector in CategoryList
});

export default rootReducer;
