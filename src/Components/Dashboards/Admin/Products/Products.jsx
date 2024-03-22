import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders, ordersDataSelector } from '../../ordersSlice';
import BasicTable from '../BasicTable/BasicTable';
import { CircularProgress, Typography } from '@mui/material';
import { fetchProducts, productsDataSelector, setProductsAction } from '../../../Store/ProductsSlice';
import axios from 'axios';
import { baseURL } from '../../../../config/config';
import { authHeaders } from '../../../../config/axiosConfig';

export default function DashboardProducts() {
    const dispatch = useDispatch();
    const productsSl = useSelector((state) => state.products);
    const products = useSelector(productsDataSelector);

    let deleteProduct = (pId) => {
        let productsCopy = [...products];
        let productInd = productsCopy.findIndex((product) => {
            return product.id == pId;
        });

        productsCopy.splice(productInd, 1);

        axios.delete(`${baseURL}/api/products/delete-product/${pId}`, {headers: authHeaders});
        dispatch(setProductsAction(productsCopy));
        

    }

    // navigate to update form


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
                            delete={deleteProduct}
                        
                        />
                    </div>
            }
        </>
    )
}
