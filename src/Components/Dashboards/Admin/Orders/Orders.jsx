import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, ordersDataSelector } from '../../ordersSlice';
import BasicTable from '../BasicTable/BasicTable';
import { CircularProgress } from '@mui/material';

export default function DashboardOrders() {
    const dispatch = useDispatch();
    const ordersSl = useSelector(ordersDataSelector);
    const orders = ordersSl.orders;
    console.log(orders);

    useEffect(() => {
            dispatch(fetchOrders());
    }, [])
    return (
        <>
            {
                ordersSl.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> :
                    <div style={{marginTop:22}}>
                        <BasicTable data={orders}
                        headings={['id' , 'price' , 'count' , 'product.title' , 'user_id' , 'seller_id' , 'order_status', 'payment_status']} // things to show from data
                        />
                    </div>
            }
        </>
    )
}
