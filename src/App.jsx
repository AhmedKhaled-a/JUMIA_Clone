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
import ProductsContainer from './Components/Store/ProductsContainer';
import { baseURL } from './config/config';
import CategoryPage from './Components/CategoryPage/CategoryPage';
import SellerDashboard from './Components/Dashboards/SellerDashboard/SellerDashboard';

import Updates from './Components/Dashboards/SellerDashboard/Updates/Updates';
import { useDispatch } from 'react-redux';
import { setTokenAction, setTypeAction, setUserAction } from './userSlice';
import { ProtectedRoute } from './ProtectedRoute';


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
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    let timeout;
    // get userData
    useEffect(() => {

        // if token exists get userdata to use in the whole app
        // timeout = setTimeout( () => {clearTimeout(timeout); setLoading(false)} , 2000);
        // check if there is a token in local storage
        // check if there is a type in local storage
        let token = localStorage.getItem('userToken') // user, seller, admin
        // call access if both exist
        const authorize = async () => {
            setLoading(true);
            let res = null;

            res = await access().catch(err => console.log(err))
            .finally(() => {setLoading(false)})

            // result should be
            /*
                {
                    user : {...}
                    role : admin,user,seller
                }
            */
            console.log(res);
            if (res) {
                dispatch(setUserAction(res.data.user));
                dispatch(setTypeAction(res.data.role));
                dispatch(setTokenAction(token));
            }
        };

        authorize();

        // get cart data


        // inside then => setUser, setToken, setType
        // else redirect to login
    }, []);




    // const classes = globalStyles();
    let routers = createBrowserRouter([
        {
            path: '/', element: <Layout userData={{}} />, children: [
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
                    path: '/dashboard', element: <ProtectedRoute><SellerDashboard /></ProtectedRoute>, children: [
                        { index: true, element: <Updates /> },
                        { path: 'orders', element: <BasicTable /> },
                        { path: 'products', element: <BasicTable /> }
                    ]
                },
                { path: '/store', element: <Store /> }
            ]
        }
    ]);

    return (
        <>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                {
                    loading ? <img src='./images/iti.png' /> : <div>
                        <RouterProvider router={routers} />
                    </div>
                }

            </ThemeProvider>

        </>
    );
}

export default App;
