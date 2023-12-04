import { combineReducers } from "redux";
import { productsReducer, selectedProductReducer } from "./productsReducer";

const reducers = combineReducers({
  allProducts: productsReducer,
  singleProduct: selectedProductReducer,
});
export default reducers;
