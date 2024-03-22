import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../userSlice';
import cartReducer from '../Components/CartPage/cartSlice';
import productsReducer from '../Components/Store/ProductsSlice';
import savedProductsReducer from '../Components/Store/savedProductsSlice';
import ordersReducer from '../Components/Dashboards/ordersSlice';


export const store = configureStore({
    reducer: {
        users: userReducer, // just to put reducers in
        carts: cartReducer, // just to put reducers in
        products: productsReducer, // just to put reducers in
        savedProducts: savedProductsReducer,
        orders: ordersReducer
    }
})