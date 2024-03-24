import React, { useEffect, useState } from 'react'
import CartCard from '../CartCard/CartCard'
import axios from 'axios';

import { Container, Divider, Grid, Typography, Button, CircularProgress } from '@mui/material';
import { baseURL } from '../../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { cartDataSelector, changeCountByValue, changeCountByValueAction, clearCartAction, deleteCartItemAction, fetchCartItems, setCartTotalPriceAction } from '../cartSlice';
import { fetchUser, userDataSelector } from '../../../userSlice';
import { authenticatedClient } from '../../../config/axiosConfig';
import { productsDataSelector } from '../../Store/ProductsSlice';

const Cart = () => {
    const cart = useSelector(cartDataSelector);
    const cartCount = cart.totalItems;
    const cartProducts = cart.cart;
    // const productsCount = cart.productsCount;
    // const products = useSelector(productsDataSelector)
    // console.log(cartProducts);
    const userData = useSelector(userDataSelector);

    const cartTotalPrice = cart.cartTotalPrice;


    const dispatch = useDispatch();


    let clearCart = (userId) => {
        dispatch(clearCartAction())
        axios.delete(`${baseURL}/api/cart/usercart/${userId}`);
        window.scrollTo(0, 0);

    }

    let changeCount = (cartId, n) => {
        let cartItem = cartProducts.find((c) => {
            console.log(c);
            if(c) {
                return c.id == cartId;
            }
            return false;
            
        });

        let count = cartItem.count;
        let newCount = count + n;
        dispatch(changeCountByValueAction([cartId, n]))

        axios.put(`${baseURL}/api/cart/${cartItem.id}/update-count`, JSON.stringify({
            count: newCount
        }, { Authorization: `Bearer ${userData.token}` })).then(res => console.log(res));

    }

    let deleteProduct = (cartId) => {
        dispatch(deleteCartItemAction(cartId));

        axios.delete(`${baseURL}/api/cart/${cartId}`);
    }

    useEffect(() => {
        if (userData.user) {
            dispatch(fetchCartItems(userData.user.id));
            console.log("done");
        } else {
            dispatch(fetchUser());
            console.log(userData);

        }
        console.log(userData.user);
    }, []);


    useEffect(() => {
        console.log(cartProducts);
        if (cartProducts) {
            let calculatedTotal = 0;
            cartProducts.forEach((cartItem) => {
                if (cartItem) {
                    let price = cartItem.product.price;
                    let priceAfterDiscount = price - (price * (cartItem.product.discount / 100))
                    let count = cartItem.count; // will change
                    calculatedTotal += priceAfterDiscount * count;
                }
            })
            dispatch(setCartTotalPriceAction(calculatedTotal.toFixed(2)));
        }
    }, [cartProducts]);

    return <div>{userData.loading || cart.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> : <Grid container spacing={1} justifyContent='center' sx={{ marginBottom: '20px' }}>
        <Grid item>
            <Typography variant='h5' gutterBottom>
                Cart ({cartCount})
            </Typography>
        </Grid>
        <Divider sx={{ width: '100%' }} />
        {
            cartProducts?.map((cart) => {
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
