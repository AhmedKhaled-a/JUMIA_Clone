import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { baseURL } from "../../config/config";


let initialState = {
    loading: false,
    orders: null,
    error : false,
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', () => {
    let token = localStorage.getItem('userToken');
    return axios.get(
        `${baseURL}/api/orders`,
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


export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setOrdersAction:  (state, action) => {
            state.orders = action.payload;
        }
    },

    // for async fetchUser call
    extraReducers: builder => {
        builder.addCase(fetchOrders.pending, state => {
            state.loading = true;
        })

        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload.orders);
            state.orders = action.payload.orders;
        })

        builder.addCase(fetchOrders.rejected, (state) => {
            state.loading = false;
            state.error = true;
            // console.log(action.payload);
        })          
    }

});

export const { setOrdersAction } = ordersSlice.actions;
export const ordersDataSelector = (state) => state.orders;
export default ordersSlice.reducer;
