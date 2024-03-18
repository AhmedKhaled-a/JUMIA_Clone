import React, { useContext, useEffect, useState } from 'react'
import CartCard from '../CartCard/CartCard'
import axios from 'axios';

import { Container, Divider, Grid, Typography } from '@mui/material';
import { CartTotalContext } from '../../../Contexts/CartTotalContext';
import { baseURL } from '../../../config/config';

const Cart = () => {
    let [cartProducts, setCartProducts] = useState(null);

    const { setTotal, total } = useContext(CartTotalContext);

    let changeCount = (cartId, n) => {
        // deep copy
        let myCartCopy = [...cartProducts];
        // do changes
        let found = myCartCopy.find((c) => c.id == cartId)
        if (found)
            found.count += n;
        else console.log("not found");

        if (found.count < 0) {
            found.count = 0;
        }
        // setState
        setCartProducts(myCartCopy);

        // Todo : send request to server with productId, n

        axios.put(`${baseURL}/api/cart/${cartId}/update-count`, JSON.stringify({ count: found.count }));
    }

    let deleteProduct = (cartId) => {
        // deep copy
        let myCartProductsCopy = [...cartProducts];
        // do changes
        
        let foundIndex = myCartProductsCopy.findIndex((c) => c.id == cartId)
        if (foundIndex >= 0)
            myCartProductsCopy.splice(foundIndex, 1);
        else console.log("not found");
        // setState
        setCartProducts(myCartProductsCopy);

        // TODO: change user_id to get from context
        axios.delete(`${baseURL}/api/cart/${cartId}`);
    }


    useEffect(() => {
        // TODO: get user_id from userContext
        let user_id = 1;
        axios.get(`${baseURL}/api/cart/usercart/${user_id}`)
            .then((res) => {
                console.log(res.data.cart_items);
                setCartProducts(res.data.cart_items);
            }).catch(err => console.log(err));
    }, []);

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

    </Grid>
}

export default Cart;
