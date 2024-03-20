import { Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material'
import React, {  useState } from 'react'
import { baseURL } from '../../../config/config';
import axios from 'axios';

export default function CartSummery() {
    const {total} = useState(0);
    // TODO: get user_id from context
    let user_id = 1;
    
    // TODO: Remove this function and get the cart items from cart component
    const handleClick = () => {
        axios.get(`${baseURL}/api/cart/usercart/1`)
            .then(function (response) {
                const cart = response.data;
                console.log(cart);
                axios.post(`${baseURL}/api/checkout`, { cart })
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
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Subtotal : {total}
            </Typography>
            
            </CardContent>
            <CardActions>
                
            <Button size="small" variant="contained" onClick={handleClick}>Checkout (total)</Button>
            </CardActions>
        </Card>
      </Container>
    )
}
