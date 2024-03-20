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
import Login from './Components/Login/Login';
import Layout from './Components/Layout/Layout';
import SellerLogin from './Components/Seller/SellerLogin';
import axios from 'axios';
import './App.css'
import MainDash from './Components/Dashboards/SellerDashboard/MainDash/MainDash';
import RightSide from './Components/Dashboards/SellerDashboard/RightSide/RightSide';
import Sidebar from './Components/Dashboards/SellerDashboard/Sidebar';

// import Home from './Components/Home/Home';
import Store from './Components/Store'
import Register from './Components/Register';
import { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import SellerSignup from './Components/Seller/SellerSignup';
import ProductsContainer from './Components/Store/ProductsContainer';
import CartContextProvider, { CartContext } from './Contexts/CartContext';
import { baseURL } from './config/config';
import CategoryPage from './Components/CategoryPage/CategoryPage';
import UserDataContextProvider, { UserDataContext } from './Contexts/UserDataStore';
import SellerDashboard from './Components/Dashboards/SellerDashboard/SellerDashboard';

import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

import { CartContext } from './Contexts/CartContext';
import Categories from './Components/CategoryPage/Categories/Categories';

function App() {
  let {UserDataValue, } = useContext(UserDataContext);

  
  console.log(UserDataValue);



  let LoginProtect = (props) => {
    if (localStorage.getItem('userToken') == null) {
      return props.children
    }
    else {
      return <Navigate to={'/'} />
    }
  }

  
  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData()
    }

    
  }, []);

  // cart context data
  // userdata
  const [userData, setUserData] = useState(null)

  function saveUserData() {
    let incodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(incodedToken);
    // console.log(decodedToken);
    setUserData(decodedToken)
  }

  // const classes = globalStyles();
  let routers = createBrowserRouter([
    {
      path: '/', element: <Layout userData={userData} setUserData={setUserData} />, children: [
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
        { path: '/login', element:<LoginProtect><Login/></LoginProtect>  },
        { path: '/register', element: <Register /> },
        { path: '/login', element: <Login /> },
        { path: '/seller/login', element: <SellerLogin /> },
        { path: '/seller/signup', element: <SellerSignup /> },
        { path: '/cat', element: <CategoryPage /> },
        { path: '/dashboard', element: <SellerDashboard /> },
        { path: '/store', element: <Store /> }
      ]
    }
        {path:'/cart', element:<CartPage /> },
        {path: '/account', element: <MyAccount />},
        {path: '/orders/index', element: <Orders />},
        {path: '/orders/closed', element: <OrdersClosed />},
        {path: '/account/inbox', element: <Inbox />},
        {path: '/account/reviews', element: <ReviewsIndex />},
        {path: '/account/saved', element: <SavedItems />},
        {path: '/account/followed-sellers', element: <FollowedSellers />},
        {path: '/account/viewed', element: <RecentlyViewed />},
        {path: '/account/address', element: <AddressBook />},
        {path: '/account/newsletter', element: <Newsletter />},
        {path: '/login' , element:<Login saveUserData={saveUserData}/>},
        {path: '/register' , element:<Register/>},
        {path: '/login' , element:<Login/>},
        {path: '/seller/login' , element:<SellerLogin />},
        {path: '/seller/signup' , element:<SellerSignup />},
        {path: '/store' , element:<ProductsContainer />},
        {path: '/categories' , element:<Categories />},

    ]}
  ]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div>
          <CartContextProvider>
            <RouterProvider router={routers} />
          </CartContextProvider>
        </div>
      </ThemeProvider>

    </>
  );
}

export default App;
