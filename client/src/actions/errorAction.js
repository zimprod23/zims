import { ONLOAD_ERROR, AUTH_ERROR, CLEAR_ERRORS } from "./types";

export const clearError = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const getLoadingError = (message) => {
  return {
    type: ONLOAD_ERROR,
    payload: message,
  };
};
