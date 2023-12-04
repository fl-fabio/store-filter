import { createSlice } from "@reduxjs/toolkit";

const selectedProductSlice = createSlice({
    name: "selectedProduct",
    initialState: {
        product: null
    },
    reducers: {
        selectedProduct: (state, action) => {
            state.product = action.payload
        },
        removeSelectedProduct: (state) => {
            state.product = null
        },
    },
});

export const { selectedProduct, removeSelectedProduct } = selectedProductSlice.actions;

export default selectedProductSlice.reducer;
