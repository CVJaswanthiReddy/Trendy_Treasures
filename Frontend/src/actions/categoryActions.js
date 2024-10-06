// src/actions/categoryActions.js

import axios from "axios";

export const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_FAILURE = "FETCH_CATEGORIES_FAILURE";

export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CATEGORIES_REQUEST });
    try {
      const response = await axios.get(
        "http://localhost:3005/api/v1/categories"
      ); // Adjust the endpoint as needed
      dispatch({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: response.data, // Make sure this is structured as you expect
      });
    } catch (error) {
      dispatch({
        type: FETCH_CATEGORIES_FAILURE,
        payload: error.message,
      });
    }
  };
};
