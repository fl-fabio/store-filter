import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../../interfaces/Product";

interface ProductsState {
    products: Product[];
    filteredProducts: Product[],
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    products: [],
    filteredProducts: [],
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            console.log('Updating products:', action.payload);
            state.products = action.payload;
        },
        updateFilteredProducts: (state, action: PayloadAction<Product[]>) => {
            state.filteredProducts = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setProducts, setLoading, setError, updateFilteredProducts } = productsSlice.actions;
export default productsSlice.reducer;
