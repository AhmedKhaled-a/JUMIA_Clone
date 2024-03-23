import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { baseURL } from "../../config/config";


let initialState = {
    loading: false,
    savedProducts: null,
    error : false,
}

export const fetchSavedProducts = createAsyncThunk('savedProducts/fetchSavedProducts', (userId) => {
    let token = localStorage.getItem('userToken');
    return axios.get(
        `${baseURL}/api/products/user-saved/${userId}`,
        {},
        { 
            headers: { 
                Authorization: `Bearer ${token}`,
                crossDomain: true
            } })
        .then((res) => {
            return res.data;
        });
});


export const savedProductsSlice = createSlice({
    name: 'savedProducts',
    initialState,
    reducers: {
        addToSavedProducts: (state, action) => { // takes a product as
            state.savedProducts?.push( action.payload );
        },

        removeFromSavedProducts: (state, action) => { // takes a productId
            let savedProdIndex = state.savedProducts?.findIndex(s => s.id == action.payload);
            state.savedProducts.splice(savedProdIndex, 1);
        },
    },

    // for async fetchUser call
    extraReducers: builder => {
        builder.addCase(fetchSavedProducts.pending, state => {
            state.loading = true;
        })

        builder.addCase(fetchSavedProducts.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);
            state.savedProducts = action.payload.products;
        })

        builder.addCase(fetchSavedProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            console.log(action.payload);
        })          
    }

});

export const { addToSavedProducts, removeFromSavedProducts } = savedProductsSlice.actions;
export const savedProductsDataSelector = (state) => state.savedProducts;
export default savedProductsSlice.reducer;
