import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../userSlice';
import cartReducer from '../Components/CartPage/cartSlice';
export const store = configureStore({
    reducer: {
        users: userReducer, // just to put reducers in
        carts: cartReducer, // just to put reducers in
    }
})