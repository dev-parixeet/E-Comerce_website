import { create } from 'zustand';
import axios from 'axios';

export const useApiStore = create((set) => ({
    apiData: null,
    fetchApiData: async () => {
        try {
            const response = await axios.get(`http://localhost:4000/posts`);
            set({ apiData: response.data });
        } catch (error) {
            console.error('Error fetching API data:', error);
        }
    },
}));


export const removewishlist = create((set) => ({
    remove: [],
    unlike: async (id: any) => {
        console.log(id, "PRODUCTID")
        try {
            const response = await axios.delete(`http://localhost:4000/whishlist/${id.toString()}`);
            set(response.data);
            console.log(set, "whishlist data received");

        } catch (error) {
            console.error('Error whishlist posting API data:', error);
        }
    },
}));


export const wishlist = create((set) => ({
    apiData: [],
    postApiData: async (product: any) => {
        try {
            product.id = product.id.toString()
            // console.log(product,"");

            const response = await axios.post(`http://localhost:4000/whishlist`, product);
            set((state: any) => { return { apiData: [...state.apiData, response.data] } });
            console.log(set, "whishlist data received");

        } catch (error) {
            console.error('Error whishlist posting API data:', error);
        }
    },
}));


export const getwishlist = create((set) => ({
    getdata: [],
    getApiData: async () => {
        try {
            const response = await axios.get(`http://localhost:4000/whishlist`);
            set((state: any) => { return { getdata: response.data } });
            console.log(set, "whishlist data received");

        } catch (error) {
            console.error('Error whishlist posting API data:', error);
        }
    },
}));



