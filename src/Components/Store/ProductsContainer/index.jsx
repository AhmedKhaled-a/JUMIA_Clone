import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { baseURL, storageURL } from '../../../config/config';
import Product from './Product/Product';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCartAction, addProductToCart, cartDataSelector, changeCountByValueAction, fetchCartItems } from '../../CartPage/cartSlice';
import { userDataSelector } from '../../../userSlice';
import { CircularProgress } from '@mui/material';
import { productsDataSelector } from '../ProductsSlice';


export default function ProductsContainer(props) {
    // let { cartProducts, setCartProducts } = useState([]);
    const cart = useSelector(cartDataSelector);
    const cartProducts = cart.cart;
    const userData = useSelector(userDataSelector);
    const products = useSelector(productsDataSelector);
    const productsCartCounts = cart.productsCount;

    // const products = useSelector(productsDataSelector);
    const dispatch = useDispatch();

    const addCart = (pId) => {
        dispatch(addProductToCart([pId, userData.user.id]))
    }


    // 
    const isInCart = (pId) => {
        // console.log(cartProducts);
        if (cartProducts?.length > 0) {
            if (cartProducts.find((c) => c.product.id == pId)) {
                return true
            }
            return false
        }

    }

    // change count in cart
    const changeInCart = (pId, n) => {
        let cartItem = cartProducts.find((c) => c.product.id == pId);

        let count = cartItem.count;
        let newCount = count + n;
        dispatch(changeCountByValueAction( [cartItem.id, n] ))

        axios.put(`${baseURL}/api/cart/${cartItem.id}/update-count`, JSON.stringify({
            count: newCount
        }, { Authorization: `Bearer ${userData.token}` })).then(res => console.log(res));
    }

    useEffect(() => {
        if (userData.user) {
            dispatch(fetchCartItems(userData.user.id));
            console.log("done");
        }
        console.log(userData.user);

    }, []);

    return (
        <>
            {userData.loading || cart.loading || products.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> : <div className='products-container rounded-1'>
                <h4 className='pb-2  border-bottom'>Android Phones</h4>
                <div className="product-cards row flex-wrap g-3">
                    {
                        products?.map((prod) => {
                            return <Product changeInCart={changeInCart} addCart={addCart} isInCart={isInCart} key={prod.id} product={prod} />
                        })
                    }
                </div>
            </div>}
        </>
    )

}
