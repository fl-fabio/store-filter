import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/Product";

interface FilterState {
    all_products: Product[],
    filtered_products: Product[],
    grid_view: boolean,
    sort: string,
    filters: {
        text: string,
        category: string,
        price: number,
        max_price: number
    }
}

const initialState: FilterState = {
    all_products: [],
    filtered_products: [],
    grid_view: true,
    sort: "price-lowest",
    filters: {
        text: "",
        category: "all",
        price: 0,
        max_price: 0,
    },
};

const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers:{
        loadProducts: (state, action: PayloadAction<Product[]>) => {
            let maxPrice = action.payload.reduce(
                (max, product) => (product.price > max ? product.price : max),
                0
            );

            state.all_products = action.payload;
            state.filtered_products = action.payload;
            state.filters.max_price = maxPrice;
            state.filters.price = maxPrice;
        },
        setGridView: (state) => {
            state.grid_view = true;
        },
        setListView: (state) => {
            state.grid_view = false;
        },
        updateSort: (state, action: PayloadAction<string>) => {
            state.sort = action.payload;
            const { sort } = state;

            if (sort === 'price-lowest') {
                state.filtered_products.sort((a, b) => a.price - b.price);
            } else if (sort === 'price-highest') {
                state.filtered_products.sort((a, b) => b.price - a.price);
            } else if (sort === 'name-a') {
                state.filtered_products.sort((a, b) => a.title.localeCompare(b.title));
            } else if (sort === 'name-z') {
                state.filtered_products.sort((a, b) => b.title.localeCompare(a.title));
            }
        },
        sortProducts: (state) => {
            const {sort, filtered_products} = state;

            state.filtered_products = [...filtered_products];

            if (sort === 'price-lowest') {
                state.filtered_products.sort((a, b) => a.price - b.price);
            }
            if (sort === 'price-highest') {
                state.filtered_products.sort((a, b) => b.price - a.price);
            }
            if (sort === 'name-a') {
                state.filtered_products.sort((a, b) => {
                    return a.title.localeCompare(b.title);
                });
            }
            if (sort === 'name-z') {
                state.filtered_products.sort((a, b) => {
                    return b.title.localeCompare(a.title);
                });
            }
        },
        updateFilters: (state, action: PayloadAction<{name: string, value: any}>) => {
            const {name, value} = action.payload;
            state.filters = {...state.filters, [name]: value};
        },
        filterProducts: (state) => {
            const {all_products} = state;
            const {text, category, price} = state.filters;

            let tempProducts = [...all_products];

            if (text) {
                tempProducts = tempProducts.filter(
                    (product) => 
                        product.title.toLowerCase().includes(text.toLowerCase()));
            }

            if (category !== "all") {
                tempProducts = tempProducts.filter(
                    (product) => product.category === category
                );
            }

            tempProducts = tempProducts.filter(
                (product) => product.price <= price
            );

            state.filtered_products = tempProducts;
        },
        clearFilters: (state) => {
            state.filters.text = "";
            state.filters.category = "all";
            state.filters.price = state.filters.max_price;
        },
    },
});

export const {
    loadProducts,
    setGridView,
    setListView,
    updateSort,
    sortProducts,
    updateFilters,
    filterProducts,
    clearFilters,
  } = filterSlice.actions;
  
  export default filterSlice.reducer;