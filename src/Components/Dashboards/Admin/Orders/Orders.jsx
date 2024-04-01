import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, ordersDataSelector, setOrdersAction } from '../../ordersSlice';
import BasicTable from '../BasicTable/BasicTable';
import { CircularProgress, Typography } from '@mui/material';
import { authHeaders } from '../../../../config/axiosConfig';
import axios from 'axios';
import { baseURL } from '../../../../config/config';

export default function DashboardOrders() {
    const dispatch = useDispatch();
    const ordersSl = useSelector(ordersDataSelector);
    const orders = ordersSl.orders;
    console.log(orders);

    useEffect(() => {
        if(!orders)
            dispatch(fetchOrders());
    }, [])

    let orderDelete = (orderId) => {
        let ordersCopy = [...orders];
        let orderInd = ordersCopy.findIndex((order) => {
            return order.id == orderId;
        });

        ordersCopy.splice(orderInd, 1);

        axios.delete(`${baseURL}/api/orders/${orderId}`, {headers: authHeaders});
        dispatch(setOrdersAction(ordersCopy));
    }
    
    return (
        <>
            <Typography variant='h2' paragraph>
                Recent Orders
            </Typography>
            {
                ordersSl.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> :
                    <div style={{ marginTop: 22 }}>
                        <BasicTable data={orders}
                            headings={['id', 'price', 'count', 'product.title', 'user_id', 'seller_id', 'order_status', 'payment_status']} // things to show from data
                            delete={orderDelete}
                        />
                    </div>
            }
        </>
    )
}
