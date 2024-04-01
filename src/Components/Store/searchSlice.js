import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchQuery: null
}

const searchSlice = createSlice({
    name:'search',
    initialState,
    reducers : {
        setSearchQueryAction:(state, action) => {
            state.searchQuery = action.payload
        }

    }

})

export const {setSearchQueryAction} = searchSlice.actions;
export const searchQuerySelector = (state) => state.search.searchQuery;
export default searchSlice.reducer;
