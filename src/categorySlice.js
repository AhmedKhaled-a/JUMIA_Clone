import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { authHeaders } from "./config/axiosConfig";
import { baseURL } from "./config/config";


let initialState = {
    loading: false,
    categories: null,
    error: false,
}

export const fetchCategories = createAsyncThunk('categories/fetchCategories', (superId) => {
    let token = localStorage.getItem('userToken');
    let url = `${baseURL}/api/categories`;
    if (superId) {
        url = `${baseURL}/api/categories?id=${superId}`;
    }
    return axios.get(
        url,
        {},
        {
            headers: authHeaders
        })
        .then((res) => {
            return res.data;
        });
});


export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},

    // for async fetchUser call
    extraReducers: builder => {
        builder.addCase(fetchCategories.pending, state => {
            state.loading = true;
        })

        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload.categories);
            state.categories = action.payload;
        })

        builder.addCase(fetchCategories.rejected, (state) => {
            state.loading = false;
            state.error = true;
            // console.log(action.payload);
        })
    }

});

export const { } = categoriesSlice.actions;
export const categoriesDataSelector = (state) => state.categories;
export default categoriesSlice.reducer;
