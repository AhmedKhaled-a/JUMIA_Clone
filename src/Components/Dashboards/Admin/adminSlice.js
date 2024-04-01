import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { baseURL } from "../../../config/config";
import { authHeaders } from "../../../config/axiosConfig";


let initialState = {
    loading: false,
    admins: null,
    error: false,
}

export const fetchAdmins = createAsyncThunk('admins/fetchAdmins', () => {
    const token = localStorage.getItem('userToken');
    return axios.get(
        `${baseURL}/api/admins/`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
                contentType: 'application/json',
                Connection: 'keep-alive',
            }
        }
    )
        .then((res) => {
            return res.data;
        });
});

export const adminsSlice = createSlice({
    name: 'admins',
    initialState,
    reducers: {
        setAdminsAction: (state, action) => {
            state.admins = action.payload;
        }
    },

    // for async fetchUser call
    extraReducers: builder => {
        builder.addCase(fetchAdmins.pending, state => {
            state.loading = true;
        })

        builder.addCase(fetchAdmins.fulfilled, (state, action) => {
            state.loading = false;
            // console.log(action.payload);
            state.admins = action.payload;
        })

        builder.addCase(fetchAdmins.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            console.log(action.payload);
        })
    }

});

export const { setAdminsAction } = adminsSlice.actions;
export const adminsDataSelector = (state) => state.admins;
export default adminsSlice.reducer;
