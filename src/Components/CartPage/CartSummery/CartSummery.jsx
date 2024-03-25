import { Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material'
import React, { useState } from 'react'
import { baseURL } from '../../../config/config';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userDataSelector } from '../../../userSlice';
import { cartDataSelector, clearCartAction } from '../cartSlice';

export default function CartSummery() {
    const cart = useSelector(cartDataSelector);
    const cartTotal = cart.cartTotalPrice;
    // TODO: get user_id from context
    const dispatch = useDispatch();

    let userData = useSelector(userDataSelector);


    // TODO: Remove this function and get the cart items from cart component
    const handleClick = () => {
        axios.get(`${baseURL}/api/cart/usercart/${userData.user.id}`)
            .then(function (response) {
                const cart = response.data;
                console.log(cart);
                axios.post(`${baseURL}/api/checkout`, { cart, userId: userData.user.id })
                    .then(function (response) {
                        window.location.href = response.data.redirectUrl;
                    })
                    .catch(function (error) {
                        console.error('Error:', error);
                    });
            })
            .catch(function (error) {
                console.error('Error:', error);
            });

        dispatch(clearCartAction())
        axios.delete(`${baseURL}/api/cart/usercart/${userData.user.id}`);
    };

    return (
        <Container maxWidth='xs' xs={12} md={6}>
            <Card>
                <CardContent >
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        CART SUMMARY
                    </Typography>
                    <Typography variant="h5" component="div">

                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.primary">
                        Subtotal : {cartTotal} $
                    </Typography>

                </CardContent>
                <CardActions>

                    <Button size="small" variant="contained" onClick={handleClick}>Checkout (total)</Button>
                </CardActions>
            </Card>
        </Container>
    )
}
