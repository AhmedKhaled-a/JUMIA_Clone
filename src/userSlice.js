import { createSlice } from "@reduxjs/toolkit"


let initialState = {
    user : null, // init state inside slice
    type : null,
    token: null,
}

export const counterSlice = createSlice({
    name: 'users',
    initialState,
    reducers : {
        setUser : (state, action) => {state.user = action.payload},
        setType : (state, action) => {state.type = action.payload},
        setToken : (state, action) => {state.token = action.payload},
    }
});

export const {setUser, setType, setToken } = counterSlice.actions;
export const userDataSelector = (state) => state.users;
export default counterSlice.reducer;
