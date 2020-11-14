import authReducer from "../reducers/authReducer";
import productReducer from "../reducers/productReducer";
import errorReducer from "./errorReducer";
import { combineReducers } from "redux";

export default combineReducers({
  auth: authReducer,
  product: productReducer,
  error: errorReducer,
});
