import React, { useContext, useEffect, useState } from 'react'
import CartCard from '../CartCard/CartCard'
import axios from 'axios';

import { Container, Divider, Grid, Typography } from '@mui/material';
import { CartTotalContext } from '../../../Contexts/CartTotalContext';

const Cart = () => {
    let [cartProducts,setCartProducts] = useState([]);

    const {setTotal, total} = useContext(CartTotalContext);
    let changeCount = (productId, n) => {
        // deep copy
        let myProductsCopy = [...cartProducts];
        // do changes
        let found = myProductsCopy.find( (p) => p.id == productId)
        if(found)
            found.rating.count += n;
        else console.log("not found");
        // setState
        setCartProducts( myProductsCopy );

        // Todo : send request to server with productId, n
    }

    let deleteProduct = (productId) => {
        // deep copy
        let myProductsCopy = [...cartProducts];
        // do changes
        let foundIndex = myProductsCopy.findIndex( (p) => p.id == productId)
        if(foundIndex >= 0)
            myProductsCopy.splice(foundIndex, 1);
        else console.log("not found");
        // setState
        setCartProducts( myProductsCopy );

        // Todo : send request to server to delete from cart
    }
        

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products/category/electronics")
        .then((res) => {
            console.log(res.data);
            setCartProducts(res.data);
        }).catch(err => console.log(err));
    },[]);

    useEffect(() => {
        let calculatedTotal = 0;
        cartProducts.forEach((prod) => {
            let count = prod.rating.count; // will change
            calculatedTotal +=  prod.price * count;
        })
        setTotal(calculatedTotal.toFixed(2))
    },[cartProducts]);

    return <Grid container spacing={1} justifyContent='center' sx={{marginBottom:'20px'}}>
            <Grid item>
                <Typography variant='h5' gutterBottom>
                    Cart ({cartProducts.length})
                </Typography>
            </Grid>
            <Divider sx={{width: '100%'}} />
        {
            cartProducts.map( (prod, index) => {

                
                return <Grid item xs={12}>
                            <CartCard product={prod} key={prod.id} changeCount={changeCount} deleteProduct={deleteProduct} />
                        </Grid>
            })
        }
    </Grid>
}

export default Cart;
