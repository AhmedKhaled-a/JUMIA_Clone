import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import BackToTopButton from './Components/BackToTopButton';
import { CssBaseline, ThemeProvider, Theme } from '@mui/material';
import Home from './Components/Home/Home';
import { theme } from './theme';
// import CategoryPage from './Components/CategoryPage/CategoryPage';
import CartPage from './Components/CartPage/CartPage';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
// import globalStyles from './styles';
import MyAccount from './Pages/MyAccount';
import Orders from './Pages/Orders';
import OrdersClosed from './Pages/OrdersClosed';
import Inbox from './Pages/Inbox';
import ReviewsIndex from './Pages/ReviewsIndex';
import SavedItems from './Pages/SavedItems';
import FollowedSellers from './Pages/FollowedSellers';
import RecentlyViewed from './Pages/RecentlyViewed';
import AddressBook from './Pages/AddressBook';
import Newsletter from './Pages/Newsletter';
import Login from './Components/UserLogin/Login';
import Layout from './Components/Layout/Layout';
import SellerLogin from './Components/Seller/SellerLogin';
import BasicTable from "./Components/Dashboards/SellerDashboard/Table/Orders";

import axios from 'axios';
import './App.css'

// import Home from './Components/Home/Home';
import Store from './Components/Store'
import Register from './Components/Register';
import { useEffect, useState } from 'react';
import SellerSignup from './Components/Seller/SellerSignup';
import { baseURL } from './config/config';
import CategoryPage from './Components/CategoryPage/CategoryPage';
import SellerDashboard from './Components/Dashboards/SellerDashboard/SellerDashboard';

import Updates from './Components/Dashboards/SellerDashboard/Updates/Updates';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, setTokenAction, setTypeAction, setUserAction, userDataSelector } from './userSlice';
import { ProtectedRoute } from './ProtectedRoute';
import MainDash from './Components/Dashboards/SellerDashboard/MainDash/MainDash';
import { cartDataSelector, fetchCartItems, initCartAction } from './Components/CartPage/cartSlice';
import Success from './Components/Payment/Success';


// function to access base auth route used in protected route
// TODO: create a function that returns yes or no , authenticated or not instead of using me
export const access = async () => {
    let userType = localStorage.getItem('userType') // user, seller, admin
    let token = localStorage.getItem('userToken') // user, seller, admin

    return await axios.post(
        `${baseURL}/api/auth/${userType}/me`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
    );
};


function App() {
    const userData = useSelector(userDataSelector)
    const dispatch = useDispatch();
    // get userData
    useEffect(() => {

        dispatch(fetchUser());
        console.log(userData);
        


    }, []);

 







    // const classes = globalStyles();
    let routers = createBrowserRouter([
        {
            path: '/', element: <Layout />, children: [
                { index: true, element: <Home /> },
                // {path:'/category', element:<CategoryPage /> },
                { path: '/cart', element: <CartPage /> },
                { path: '/account', element: <MyAccount /> },
                { path: '/orders/index', element: <Orders /> },
                { path: '/orders/closed', element: <OrdersClosed /> },
                { path: '/account/inbox', element: <Inbox /> },
                { path: '/account/reviews', element: <ReviewsIndex /> },
                { path: '/account/saved', element: <SavedItems /> },
                { path: '/account/followed-sellers', element: <FollowedSellers /> },
                { path: '/account/viewed', element: <RecentlyViewed /> },
                { path: '/account/address', element: <AddressBook /> },
                { path: '/account/newsletter', element: <Newsletter /> },
                { path: '/login', element: <Login /> },
                { path: '/register', element: <Register /> },
                { path: '/login', element: <Login /> },
                { path: '/seller/login', element: <SellerLogin /> },
                { path: '/seller/signup', element: <SellerSignup /> },
                { path: '/cat', element: <CategoryPage /> },
                {
                    path: '/dashboard', element: <SellerDashboard />, children: [
                        { index: true, element: <MainDash /> },
                        { path: 'orders', element: <BasicTable /> },
                        { path: 'products', element: <BasicTable /> }
                    ]
                },
                { path: '/store', element: <Store /> },
                {path: '/payment/success' , element:<Success />},
            ]
        }
    ]);

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                {
                    userData.loading ? <img src='./images/iti.png' /> : <div>
                        <RouterProvider router={routers} />
                    </div>
                }

            </ThemeProvider>

        </>
    );
}

export default App;
