import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import BackToTopButton from './Components/BackToTopButton';
import { CssBaseline,ThemeProvider, Theme } from '@mui/material';
import Home from './Components/Home/Home';
import { theme } from './theme';
// import CategoryPage from './Components/CategoryPage/CategoryPage';
import CartPage from './Components/CartPage/CartPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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



// import Home from './Components/Home/Home';
import Store from './Components/Store'

function App() {
  // const classes = globalStyles();
  let routers = createBrowserRouter([
    {path: '/' , element:<Layout /> , children:[
        {index: true, element:<Home />},
        // {path:'/category', element:<CategoryPage /> },
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
        {path: '/login' , element:<Login/>},
    ]}
  ]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className="container-fluid mt-5 pt-5" style={{backgroundColor : theme.palette.background.default}}>
          <RouterProvider router={routers} />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
