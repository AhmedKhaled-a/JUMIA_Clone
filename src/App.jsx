import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import BackToTopButton from './Components/BackToTopButton';
import { CssBaseline,ThemeProvider, Theme } from '@mui/material';
import Home from './Components/Home/Home';
import { theme } from './theme';
import CategoryPage from './Components/CategoryPage/CategoryPage';
import CartPage from './Components/CartPage/CartPage';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout';

function App() {
  let routers = createBrowserRouter([
    {path: '/' , element:<Layout /> , children:[
        {index: true, element:<Home />},
        {path:'/category', element:<CategoryPage /> },
        {path:'/cart', element:<CartPage /> },
    ]}
  ]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div className="container mt-5 vh-100 pt-5">
          <RouterProvider router={routers} />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
