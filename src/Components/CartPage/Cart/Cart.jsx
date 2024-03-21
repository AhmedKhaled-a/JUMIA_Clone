import React, { useEffect, useState } from 'react'
import CartCard from '../CartCard/CartCard'
import axios from 'axios';

import { Container, Divider, Grid, Typography, Button, CircularProgress } from '@mui/material';
import { baseURL } from '../../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { cartDataSelector, changeCountByValue, changeCountByValueAction, clearCartAction, deleteCartItemAction, fetchCartItems } from '../cartSlice';
import { userDataSelector } from '../../../userSlice';
import { authenticatedClient } from '../../../config/axiosConfig';

const Cart = () => {
    const cart = useSelector(cartDataSelector);
    const cartCount = cart.totalItems;
    const cartProducts = cart.cart;
    // console.log(cartProducts);
    const userData = useSelector(userDataSelector);
    const [total, setTotal] = useState(0);
    console.log(userData.loading);


    const dispatch = useDispatch();


    let clearCart = (userId) => {
        dispatch(clearCartAction())
        axios.delete(`${baseURL}/api/cart/usercart/${userId}`);
        window.scrollTo(0, 0);

    }

    let changeCount = (cartId, n) => {
        let count = cartProducts.find((c) => c.id == cartId).count;
        dispatch(changeCountByValueAction([cartId, n]));
        authenticatedClient.put(`/cart/${cartId}/update-count`, JSON.stringify({ count: ++count }));
    }

    let deleteProduct = (cartId) => {
        dispatch(deleteCartItemAction(cartId));

        axios.delete(`${baseURL}/api/cart/${cartId}`);
    }

    useEffect(() => {
        if (userData.user) {
            dispatch(fetchCartItems(userData.user.id));
            console.log("done");
        }
        console.log(userData.user);
    }, [])


    useEffect(() => {
        // if (cartProducts) {
        //     let calculatedTotal = 0;
        //     cartProducts?.forEach((c) => {
        //         let count = c.count; // will change
        //         calculatedTotal += cart.product.price * count;
        //     })
        //     setTotal(calculatedTotal.toFixed(2));
        // }
    }, [cartProducts]);

    return <div>{userData.loading || cart.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> : <Grid container spacing={1} justifyContent='center' sx={{ marginBottom: '20px' }}>
        <Grid item>
            <Typography variant='h5' gutterBottom>
                Cart ({cartCount})
            </Typography>
        </Grid>
        <Divider sx={{ width: '100%' }} />
        {
            cartProducts?.map( (cart) => {
                if (cart)
                    return <Grid item xs={12}>
                        <CartCard count={cart.count} cartId={cart.id} product={cart.product} key={cart.id} changeCount={changeCount} deleteProduct={deleteProduct} />
                    </Grid>
            })
        }
        {cartProducts.length > 0 ? <Button sx={{ margin: "18px" }} size="small" variant="contained" onClick={() => { clearCart(userData.user.id) }}>Clear Cart</Button> : ''}
    </Grid>
    }</div>
}

export default Cart;
