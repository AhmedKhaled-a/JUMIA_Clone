import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { productReducer } from "./productDetails";

export default combineReducers({
  form: formReducer,
  productReducer,
});
