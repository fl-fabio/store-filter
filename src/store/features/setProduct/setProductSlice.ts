import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductById } from '../../api/productsAPI';
import { Product } from '../../../interfaces/Product';

interface setProductState {
    product: Product | null;
    loading: boolean;
    error: string | null;
}

const initialState: setProductState = {
    product: null,
    loading: false,
    error: null,
};

// Async thunk
export const fetchSelectedProduct = createAsyncThunk(
    'selectedProduct/fetchProductById',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await fetchProductById(id);
            return response.data;
        } catch (error) {
            return console.log(error);
        }
    }
);

const setProductSlice = createSlice({
    name: "selectedProduct",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        removeSelectedProduct: (state) => {
            state.product = null;
        },
    },
});

export const { setProduct, setLoading, setError, removeSelectedProduct } = setProductSlice.actions;

export default setProductSlice.reducer;
