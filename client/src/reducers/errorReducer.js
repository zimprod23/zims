import { ONLOAD_ERROR, AUTH_ERROR, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  authError: null,
  LoadingError: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ONLOAD_ERROR:
      return {
        ...state,
        LoadingError: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        LoadingError: null,
      };
    default:
      return { ...state };
  }
}
