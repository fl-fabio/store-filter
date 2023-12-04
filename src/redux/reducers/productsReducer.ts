import { ActionTypes } from "../constants/action-types";

const initialState = {
    products: [],
}

export const productsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return state
    }
}

const initialSelectedProductState = { product: null };
export const selectedProductReducer = (state = initialSelectedProductState, action: any) => {
    switch(action.type) {
        case ActionTypes.SELECTED_PRODUCT:
            return {
                ...state,
                product: action.payload
            };

        case ActionTypes.REMOVE_SELECTED_PRODUCT:
            return initialSelectedProductState;
        default:
            return state;
    }
};