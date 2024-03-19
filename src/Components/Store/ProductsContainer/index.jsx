import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { baseURL, storageURL } from '../../../config/config';
import Product from './Product/Product';
import axios from 'axios';
import { CartContext } from '../../../Contexts/CartContext';


export default function ProductsContainer(props) {
    let { cartProducts, setCartProducts } = useContext(CartContext);
    // TODO: get user_id from context
    let user_id = 1;



    const addCart = (pId) => {
        console.log(cartProducts);
        let cartCopy = [...cartProducts];
        cartCopy.push({
            count: 1,
            product: props.products.find( (p) => p.id = pId )
        });
        setCartProducts(cartCopy);
        // send request to add to cart
        axios.post(`${baseURL}/api/cart/add/${user_id}`, JSON.stringify({ product_id: pId, count: 1 }))
    }

    const isInCart = (pId) => {
        // console.log(cartProducts);
        if (cartProducts.find((c) => c.product.id == pId)) {
            return true
        }
        return false
    }

    const incrementInCart = (pId) => {
        let cartProductsCopy = [...cartProducts];
        let cartItemIndex = cartProductsCopy.findIndex((c) => c.product.id == pId);

        if (cartItemIndex >= 0) {
            cartProductsCopy[cartItemIndex].count++;
            console.log(cartProductsCopy);
            setCartProducts(cartProductsCopy);
            let cartId = cartProductsCopy[cartItemIndex].id;
            console.log( cartProductsCopy[cartItemIndex].id);
            axios.put(`${baseURL}/api/cart/${cartId}/update-count` , JSON.stringify({
                count : cartProductsCopy[cartItemIndex].count
            })).then(res => console.log(res));
        }

    }

    return (
        <>
            <div className='products-container rounded-1'>
                <h4 className='pb-2  border-bottom'>Android Phones</h4>
                <div className="product-cards row flex-wrap g-3">
                    {
                        props.products?.map((prod) => {
                            return <Product incrementInCart={incrementInCart} addCart={addCart} isInCart={isInCart} key={prod.id} product={prod} />
                        })
                    }
                </div>
            </div>
        </>
    )
}
