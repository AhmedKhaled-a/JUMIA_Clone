import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import Account from '../Components/Account/Account';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import TopSelling from '../Components/Account/TopSelling';
import { userDataSelector } from '../userSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';

const drawerWidth = 240;


export default function Orders() {
    const { user } = useSelector(userDataSelector);
    const [orders, setOrders] = useState([]);
    // const [productData, setProductData] = useState({});
    const userId = user.id;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/orders/user/${userId}`);
                const filteredOrders = response.data.filter(order => order.order_status === 'processing' || order.order_status === 'delivered');
                setOrders(filteredOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [userId]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return date.toLocaleDateString('en-US', options);
    }

    // useEffect(() => {
    //     const fetchOrders = async () => {
    //         try {
    //             const response = await axios.get(`http://127.0.0.1:8000/api/orders/user/${userId}`);
    //             setOrders(response.data);
    //             response.data.forEach(async (order) => {
    //                 try {
    //                     const productResponse = await axios.get(`http://127.0.0.1:8000/api/products/${order.product_id}`);
    //                     setProductData(prevState => ({
    //                         ...prevState,
    //                         [order.id]: productResponse.data // Store product data with order id as key
    //                     }));
    //                 } catch (error) {
    //                     console.error('Error fetching product data:', error);
    //                 }
    //             });
    //         } catch (error) {
    //             console.error('Error fetching orders:', error);
    //         }
    //     };

    //     fetchOrders();
    // }, []);

    return (
        <>
        <Container style={{display: 'grid', marginBottom: '50px'}}>
            <Box sx={{ display: "flex" }}>
            <Account/>
                <Box
                    component="main"
                    sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    overflowY: 'auto',
                    maxHeight: 'calc(100vh - 80px)'
                    }}
                >
                    {/* <Toolbar /> */}
                    {/* <h1>ID: {userId}</h1> */}
                    <div className='border-bottom mb-5'>
                            <Link to="/orders/index" className='me-3'>
                                <Button variant='text' sx={{borderRadius: '0', color: '#f68b1e', borderBottom: '2px solid #f68b1e', '&:hover': {backgroundColor: '#fcdbb9'} }}> ONGOING/DELIVERED ({orders.length}) </Button>
                            </Link>
                            <Link to="/orders/closed">
                                <Button variant='text' sx={{color: '#f68b1e', '&:hover': {backgroundColor: '#fcdbb9'} }}> CANCELED/RETURNED </Button>
                            </Link>
                    </div>
                    
                    <div>
                            {orders.length > 0 ? (
                                <>
                                    <table class="table bg-light text-center">
                                        <thead>
                                            <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Status</th>
                                            </tr>
                                        </thead>
                                        
                                    
                                    {orders.map(order => (
                                        <tr key={order.id} className=' border-bottom'>
                                            <th scope="row" className='p-3'>{formatDate(order.created_at)}</th>
                                            <td>${order.price}</td>
                                            <td>{order.count}</td>
                                            <td>{order.order_status}</td>
                                        </tr>
                                        // <div>
                                        //     <p>{order.id}</p>
                                        //     <p>{order.count}</p>
                                        //     <p>{order.price}</p>
                                        //     <p>{order.order_status}</p>
                                        //     Product:
                                        //     <p>Product Name: {productData[order.id].title}</p>
                                        //     <p>Product Thumbnail: {productData[order.id].thumbnail}</p>
                                        // </div>
                                    ))}
                                <tbody>
                                </tbody>
                                </table>
                                </>
                            ) : (
                                // Show message if no orders available
                                <div className='d-flex justify-content-center align-items-center flex-column h-100'>
                                    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle fill="#F5F5F5" cx="50" cy="50" r="50" /></svg>
                                    <h6 className='mt-3'>You have placed no orders yet!</h6>
                                    <p className='mt-2 W-50 text-center'>All your orders will be saved here for you to access their state anytime.</p>
                                    <a href="#">
                                        <Button variant="contained" sx={{ fontSize: 18, backgroundColor: '#f68b1e', '&:hover': { backgroundColor: '#e07e1b' } }}>CONTINUE SHOPPING</Button>
                                    </a>
                                </div>
                            )}
                        </div>
                </Box>
            </Box>
        </Container>
        <TopSelling />
        </>
        
    )
}
