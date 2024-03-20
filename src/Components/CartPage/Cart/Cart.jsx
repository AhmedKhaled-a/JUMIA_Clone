import React, { useEffect, useState } from 'react'
import CartCard from '../CartCard/CartCard'
import axios from 'axios';

import { Container, Divider, Grid, Typography, Button } from '@mui/material';
import { baseURL } from '../../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { cartDataSelector, changeCountByValue, changeCountByValueAction, clearCartAction, deleteCartItemAction } from '../cartSlice';
import { userDataSelector } from '../../../userSlice';

const Cart = () => {

    const cartProducts = useSelector(cartDataSelector);
    const userData = useSelector(userDataSelector);

    const dispatch = useDispatch();

    const user_id = userData.user.id;
    // console.log(user_id);
    const [ total, setTotal ] = useState(0);

    let clearCart = (userId) => {
        dispatch(clearCartAction())
        axios.delete(`${baseURL}/api/cart/usercart/${userId}`);
    }

    let changeCount = (cartId, n) => {
        dispatch(changeCountByValueAction([cartId, n]))
        let updatedCount = cartProducts.find( (c) => c.id == cartId ).count;
        axios.put(`${baseURL}/api/cart/${cartId}/update-count`, JSON.stringify({ count: updatedCount }));
    }

    let deleteProduct = (cartId) => {
        dispatch(deleteCartItemAction(cartId))
        axios.delete(`${baseURL}/api/cart/${cartId}`);
    }


    useEffect(() => {
        let calculatedTotal = 0;
        cartProducts?.forEach((cart) => {
            let count = cart.count; // will change
            calculatedTotal += cart.product.price * count;
        })
        setTotal(calculatedTotal.toFixed(2))
    }, [cartProducts]);

    return <Grid container spacing={1} justifyContent='center' sx={{ marginBottom: '20px' }}>
        <Grid item>
            <Typography variant='h5' gutterBottom>
                Cart ({cartProducts?.length})
            </Typography>
        </Grid>
        <Divider sx={{ width: '100%' }} />
        {
            cartProducts?.map((cart) => {
                return <Grid item xs={12}>
                    <CartCard count={cart.count} cartId={cart.id} product={cart.product} key={cart.id} changeCount={changeCount} deleteProduct={deleteProduct} />
                </Grid>
            })
        }
        { cartProducts.length > 0 ? <Button sx={{margin:"18px"}} size="small" variant="contained" onClick={() => { clearCart(user_id) }}>Clear Cart</Button> : ''}
    </Grid>
}

export default Cart;
