import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productsSlice";
import setProductReducer from "./features/setProduct/setProductSlice";
import filterReducer from "./slices/filterSlice";

const store = configureStore({
  reducer: {
    allProducts: productsReducer,
    selectedProduct: setProductReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;