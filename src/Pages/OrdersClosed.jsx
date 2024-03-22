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


export default function OrdersClosed() {
    const { user } = useSelector(userDataSelector);
    const [orders, setOrders] = useState([]);
    const userId = user.id;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/orders/user/${userId}`);
                const filteredOrders = response.data.filter(order => order.order_status === 'rejected');
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

    return (
        <>
        <Container style={{display: 'grid', marginBottom: '50px'}}>
            <Box sx={{ display: "flex" }}>
                <Account />
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
                    
                    <div className='border-bottom mb-5'>
                            <Link to="/orders/index" className='me-3'>
                                <Button variant='text' sx={{color: '#f68b1e', '&:hover': {backgroundColor: '#fcdbb9'} }}> ONGOING/DELIVERED </Button>
                            </Link>
                            <Link to="/orders/closed">
                                <Button variant='text' sx={{borderRadius: '0', color: '#f68b1e', '&:hover': {backgroundColor: '#fcdbb9'}, borderBottom: '2px solid #f68b1e', }}> CANCELED/RETURNED ({orders.length}) </Button>
                            </Link>
                    </div>

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
                                    ))}
                                <tbody>
                                </tbody>
                                </table>
                                </>
                            ) : (
                    
                                <div>
                                    <div className='d-flex justify-content-center align-items-center flex-column h-100'>      
                                        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><circle fill="#F5F5F5" cx="50" cy="50" r="50"/><path d="M86.7 55.16L66.43 68.23l-.01-.01a7.63 7.63 0 00-8.23-1.7L46.8 48.66l25.32-16.34a2.52 2.52 0 013.5.77l11.84 18.56a2.56 2.56 0 01-.77 3.51z" fill="#F90"/><path d="M14.56 32.57c.09.14.28.18.42.09l7.21-4.68a.3.3 0 00.09-.42l-1.65-2.6a.3.3 0 00-.2-.14.3.3 0 00-.22.04L13 29.54a.3.3 0 00-.14.19c-.01.08 0 .16.04.23l1.66 2.6z" fill="#535353"/><path d="M31.24 25.2L57.86 66.5c-1 .4-1.9.99-2.64 1.74L28.6 26.97a2.87 2.87 0 00-3.99-.92l-2.16 1.37-1.7-2.65 2.15-1.38a6.05 6.05 0 018.33 1.81zM84.7 58.1c0 1.09-.54 2.1-1.44 2.68l-15 9.82a7.64 7.64 0 00-1.72-2.65l17.67-11.56c.32.51.49 1.1.49 1.71z" fill="#C9C9C9"/><path d="M67.6 71.4a7.34 7.34 0 00-1.67-2.55l-.02-.01a7.5 7.5 0 00-8.05-1.66l-.02.01a7.52 7.52 0 00-3.17 11.53A7.5 7.5 0 0067.6 71.4zm-5.48 5.08a2.77 2.77 0 11-3-4.66 2.77 2.77 0 013 4.66z" fill="#535353"/><path fill="#FFB048" d="M66.54 35.84L46.9 48.5 36.54 32.27l.02-.01L56.8 19.28l3.02 4.6-.63.45z"/><path fill="#F90" d="M59.44 24.81l1.22 1.84-19.73 12.37-1.23-1.83z"/><path fill="#F5F5F5" d="M53.12 32.87l-3.45 2.2-5.23-8.05 3.44-2.2z"/></svg>
                                        <h6 className='mt-3'>No Closed Orders to Display</h6>
                                        <p className='mt-2'>All your Closed Orders will be saved here.</p>
                                        <a href="#">
                                        <Button variant="contained" sx={{fontSize: 18, backgroundColor: '#f68b1e', '&:hover': {backgroundColor: '#e07e1b'} }}>START SHOPPING</Button>
                                        </a>
                                    </div>
                                </div>
                        )}
                </Box>
            </Box>
        </Container>
        <TopSelling />
        </>
        
    )
}
