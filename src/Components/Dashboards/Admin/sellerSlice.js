import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { baseURL } from "../../../config/config";
import { authHeaders } from "../../../config/axiosConfig";


let initialState = {
    loading: false,
    sellers: null,
    error: false,
}

export const fetchSellers = createAsyncThunk('sellers/fetchSellers', () => {
    let token = localStorage.getItem('userToken');
    console.log(token);
    return axios.get(
        `${baseURL}/api/sellers`,
        null,
        {
            
            headers: {
                Authorization: "JWT " + token,
                crossDomain: true,
                contentType: 'application/json',
                Connection: 'keep-alive',
                AcceptEncoding : 'gzip, deflate, br'

            }
        })
        .then((res) => {
            return res.data;
        });
});


export const sellersSlice = createSlice({
    name: 'sellers',
    initialState,
    reducers: {
        setSellersAction: (state, action) => {
            state.sellers = action.payload;
        }
    },

    // for async fetchUser call
    extraReducers: builder => {
        builder.addCase(fetchSellers.pending, state => {
            state.loading = true;
        })

        builder.addCase(fetchSellers.fulfilled, (state, action) => {
            state.loading = false;
            // console.log(action.payload.sellers);
            state.sellers = action.payload.sellers;
        })

        builder.addCase(fetchSellers.rejected, (state) => {
            state.loading = false;
            state.error = true;
            // console.log(action.payload);
        })
    }

});

export const { setSellersAction } = sellersSlice.actions;
export const sellersDataSelector = (state) => state.sellers;
export default sellersSlice.reducer;
