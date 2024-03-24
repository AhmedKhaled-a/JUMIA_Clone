import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import BackToTopButton from './Components/BackToTopButton';
import { CssBaseline, ThemeProvider, Theme, CircularProgress } from '@mui/material';
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
import SellerLogin from './Components/SellerLogin/Login';

// import BasicTable from "./Components/Dashboards/SellerDashboard/Table/Orders";

import axios from 'axios';
import './App.css'

// import Home from './Components/Home/Home';
import Store from './Components/Store'
import Register from './Components/Register';
import { useEffect, useState } from 'react';
import SellerSignup from './Components/Seller/SellerSignup';
import { baseURL } from './config/config';
import CategoryPage from './Components/CategoryPage/CategoryPage';

import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchUser, userDataSelector } from './userSlice';
import { ProtectedRoute } from './ProtectedRoutes/ProtectedRoute';
import { cartDataSelector, getCartTotal } from './Components/CartPage/cartSlice';
import Success from './Components/Payment/Success';
import VerificationSuccess from './Components/Verification Success/VerificationSuccess';
import DashboardOrders from './Components/Dashboards/Admin/Orders/Orders';
import { ErrorPage } from './Components/Errors/ErrorPage/ErrorPage';
import AdminLogin from './Components/Dashboards/Admin/AdminLogin/AdminLogin';
import DashboardProducts from './Components/Dashboards/Admin/Products/Products';
import AddProductForm from './Components/Dashboards/Admin/AddProduct/addProductForm';
import { jwtDecode } from 'jwt-decode';
import { ResetPassowrdForUser } from './Components/ResetPassword/ResetPassowrdForUser';
import { ResetPasswordFieldsForUser } from './Components/ResetPassword/ResetPasswordFieldsForUser';
import { ResetPasswordForSeller } from './Components/ResetPassword/ResetPasswordForSeller';
import { ResetPasswordFieldsForSeller } from './Components/ResetPassword/ResetPasswordFieldsForSeller';
import Dashboard from './Components/Dashboards/Admin/muiDashboard/Dashboard';
import GLayout from './Components/GLayout';
import MainDash from './Components/Dashboards/Admin/muiDashboard/mainDash';
import DashboardAdmins from './Components/Dashboards/Admin/Admins/DashboardAdmins';
import DashboardSellers from './Components/Dashboards/Admin/Sellers/DashboardSellers';
import ProductDetailView from './Components/Store/Product/Detail';
import Unauth from './Components/Errors/UnauthPage/Unauth';
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUserName: (data) => {
            dispatch({ type: "USER", value: data });
        },
    };
}




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
    const userData = useSelector(userDataSelector);
    let category_id = 7;
    let cart = useSelector(cartDataSelector);
    const dispatch = useDispatch();
    // get userData
    useEffect(() => {
        dispatch(fetchUser());

        console.log(userData);
    }, []);

    useEffect(() => {
        // if (userData.user == null) {
        //     dispatch(fetchUser());
        //     console.log("dispatched again");
        //     console.log(userData);
        // }

        if (userData.user && !cart.totalItems) {
            dispatch(getCartTotal(userData.user.id));

        }
        // if(userData.error) {  }

        const token = localStorage.getItem('userToken');

        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            axios.defaults.headers.common['Authorization'] = null;
            delete axios.defaults.headers.common['Authorization'];
            /*if setting null does not remove `Authorization` header then try     
              delete axios.defaults.headers.common['Authorization'];
            */
        }
        // }

    }, [userData]);

    let routers = createBrowserRouter([
        {
            path: '/', errorElement: <ErrorPage />, element: <GLayout />, children: [
                { path: '/unauth', element: <Unauth /> },
                {
                    path: "", element: <Layout />, children: [
                        { index: true, element: <Home /> },
                        { path: '/seller/login', element: <SellerLogin /> },
                        { path: '/register', element: <Register /> },
                        { path: '/login', element: <Login /> },

                        { path: '/store', element: <Store id={category_id} /> },
                        { path: '/store/product/:id', element: <ProductDetailView /> },

                        { path: '/reset-password/request', element: <ResetPassowrdForUser /> },
                        { path: '/reset-Password/request/:remember_token', element: <ResetPasswordFieldsForUser /> },
                        { path: '/seller/reset-password/request', element: <ResetPasswordForSeller /> },
                        { path: '/seller/reset-Password/request/:remember_token', element: <ResetPasswordFieldsForSeller /> },
                        {
                            element: <ProtectedRoute role={'user'} ></ProtectedRoute>, children: [
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
                                { path: '/seller/signup', element: <SellerSignup /> },
                                // { path: '/cat', element: <CategoryPage /> },
                                { path: '/payment/success', element: <Success /> },
                                { path: '/cart', element: <CartPage /> },
                                { path: '/verification/success', element: <VerificationSuccess /> },
                            ]
                        }]
                },
                // {path:'/category', element:<CategoryPage /> },


                // admin routes
                {
                    path: '/admin', children: [
                        { path: 'login', element: <AdminLogin /> }
                    ]
                },

                // dashboard routes
                {
                    path: "/dashboard", element: <ProtectedRoute role={'admin'} ></ProtectedRoute>, children: [
                        {
                            path: '/dashboard', element: <Dashboard />, children: [
                                { index: true, element: <MainDash /> },
                                { path: 'orders', element: <DashboardOrders /> },
                                { path: 'products', element: <DashboardProducts /> },
                                { path: 'sellers', element: <DashboardSellers /> },
                                { path: 'add-product', element: <AddProductForm /> },
                                {
                                    path: 'admins', element: <ProtectedRoute role={'superAdmin'} ></ProtectedRoute>, children: [
                                        { index: true, element: <DashboardAdmins /> }
                                    ]
                                }
                            ]
                        },
                    ]
                },


                { path: '/addProduct', element: <AddProductForm /> },
            ]
        }
    ]);

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                {
                    userData.loading || cart.totalItemsLoading ? <CircularProgress sx={{ marginLeft: '50%' }} /> : <div>
                        <RouterProvider router={routers} />
                    </div>
                }

            </ThemeProvider>
        </>





    );
}

export default App;