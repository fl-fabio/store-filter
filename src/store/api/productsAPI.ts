import axios from 'axios';
import { Product } from '../../interfaces/Product';

const baseURL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
    try {   
        const response = await axios.get<Product[]>(baseURL);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

export const fetchProductById = async (id: string) => {
    try {   
        const response = await axios.get(`${baseURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product:", error);
        throw error;
    }
};