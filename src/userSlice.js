import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { baseURL } from "./config/config";


let initialState = {
    loading : false,
    user : null, // init state inside slice
    type : null,
    isSuperAdmin : false,
    token: null,
    error: false
}

export const fetchUser = createAsyncThunk('users/fetchUsers' , () => {
    let userType = localStorage.getItem('userType') // user, seller, admin
    let token = localStorage.getItem('userToken') // user, seller, admin 
    if(userType)
        return axios.post(
            `${baseURL}/api/auth/${userType}/me`,
            {},
            { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => {
                return res.data;
            })
    
    return initialState;
})

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers : {
        // you can mutate state here it is okay
        setUserAction : (state, action) => {state.user = action.payload},
        setTypeAction : (state, action) => {state.type = action.payload},
        setTokenAction : (state, action) => {state.token = action.payload},
        setSuperAdminAction: (state, action) => {state.isSuperAdmin = action.payload},
        resetUserData: (state) => {
            state = initialState;
        },
    },
    
    // for async fetchUser call
    extraReducers: builder => {
        builder.addCase(fetchUser.pending, state => {
            state.loading = true;
            state.error = false;

        })
        builder.addCase(fetchUser.fulfilled , (state,action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.type = action.payload.role;
            state.isSuperAdmin = action.payload.isSuperAdmin;
            state.token = localStorage.getItem('userToken');
            state.error = false;
        })

        builder.addCase(fetchUser.rejected , state => {
            state.loading = false;
            state.error = true;
            state.user = null;
            state.type = null;
            state.token = null;
        })
    }
});

export const { setUserAction, setTypeAction, setTokenAction, setSuperAdminAction, resetUserData } = userSlice.actions;
export const userDataSelector = (state) => state.users;
export default userSlice.reducer;
