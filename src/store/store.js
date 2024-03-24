import {configureStore} from "@reduxjs/toolkit";
import userReducer from '../userSlice';
import cartReducer from '../Components/CartPage/cartSlice';
import productsReducer from '../Components/Store/ProductsSlice';
import savedProductsReducer from '../Components/Store/savedProductsSlice';
import ordersReducer from '../Components/Dashboards/ordersSlice';
import adminsReducer from '../Components/Dashboards/Admin/adminSlice';
import sellersReducer from '../Components/Dashboards/Admin/sellerSlice';
import searchReducer from '../Components/Store/searchSlice';
import categoriesReducer from '../categorySlice';

export const store = configureStore({
    reducer: {
        users: userReducer, // just to put reducers in
        carts: cartReducer, // just to put reducers in
        products: productsReducer, // just to put reducers in
        savedProducts: savedProductsReducer,
        orders: ordersReducer,
        admins: adminsReducer,
        sellers: sellersReducer,
        search:searchReducer,
        categories: categoriesReducer
    }
})