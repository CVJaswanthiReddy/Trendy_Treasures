// src/reducers/categoryReducer.js

import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from "../actions/categoryActions";

const initialState = {
  items: [], // This should be initialized as an empty array
  loading: false,
  error: null,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, items: action.payload }; // Ensure payload is structured correctly
    case FETCH_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default categoryReducer;
