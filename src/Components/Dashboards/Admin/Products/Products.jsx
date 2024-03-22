import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, ordersDataSelector } from '../../ordersSlice';
import BasicTable from '../BasicTable/BasicTable';
import { CircularProgress, Typography } from '@mui/material';
import { fetchProducts, productsDataSelector } from '../../../Store/ProductsSlice';

export default function DashboardProducts() {
    const dispatch = useDispatch();
    const productsSl = useSelector((state) => state.products);
    const products = useSelector(productsDataSelector);

    useEffect(() => {
        if (products.length == 0)
            dispatch(fetchProducts("products"));
    }, [])
    return (
        <>
            <Typography variant='h2' paragraph>
                Products
            </Typography>
            {
                productsSl.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> :
                    <div style={{ marginTop: 22 }}>
                        <BasicTable data={products}
                            headings={['id', 'title', 'desc', 'price', 'barnd', 'stock', 'rating', 'category_id', 'seller_id']} // things to show from data
                        />
                    </div>
            }
        </>
    )
}
