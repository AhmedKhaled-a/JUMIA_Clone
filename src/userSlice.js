import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { baseURL } from "./config/config";


let initialState = {
    loading : false,
    user : null, // init state inside slice
    type : null,
    token: null,
}

export const fetchUser = createAsyncThunk('users/fetchUsers' , () => {
    let userType = localStorage.getItem('userType') // user, seller, admin
    let token = localStorage.getItem('userToken') // user, seller, admin 

    return axios.post(
        `${baseURL}/api/auth/${userType}/me`,
        {},
        { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            return res.data;
        })
})

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers : {
        // you can mutate state here it is okay
        setUserAction : (state, action) => {state.user = action.payload},
        setTypeAction : (state, action) => {state.type = action.payload},
        setTokenAction : (state, action) => {state.token = action.payload},
    },
    // for async fetchUser call
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchUser.fulfilled , (state,action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.type = action.payload.role;
            state.token = localStorage.getItem('userToken');
        })

        builder.addCase(fetchUser.rejected , state => {
            state.loading = false;
            state.user = {};
            state.type = null;
            state.token = null;
        })
    }
});

export const { setUserAction, setTypeAction, setTokenAction } = userSlice.actions;
export const userDataSelector = (state) => state.users;
export default userSlice.reducer;
