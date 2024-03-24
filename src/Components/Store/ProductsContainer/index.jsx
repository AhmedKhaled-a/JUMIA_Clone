import React, { useContext, useEffect, useState } from 'react'
import './index.css'
import { baseURL, storageURL } from '../../../config/config';
import Product from './Product/Product';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCartAction, addProductToCart, cartDataSelector, changeCountByValueAction, deleteCartItemAction, deleteCartItemByProductAction, fetchCartItems } from '../../CartPage/cartSlice';
import { userDataSelector } from '../../../userSlice';
import { CircularProgress, MenuItem, TextField } from '@mui/material';
import { fetchProducts } from '../ProductsSlice';
import { addToSavedProducts, fetchSavedProducts, removeFromSavedProducts, savedProductsDataSelector } from '../savedProductsSlice';
import { authHeaders } from '../../../config/axiosConfig';


export default function ProductsContainer(props) {
    // let { cartProducts, setCartProducts } = useState([]);
    const cart = useSelector(cartDataSelector);
    const cartProducts = cart.cart;
    const userData = useSelector(userDataSelector);
    const productsSl = useSelector((state) => state.products);
    const products = productsSl.products;
    const saved = useSelector(savedProductsDataSelector);
    const savedProducts = saved.savedProducts;

    // const products = useSelector(productsDataSelector);
    const dispatch = useDispatch();

    /******************************************* Cart ***************************************************************************** */
    const addCart = (pId) => {
        dispatch(addProductToCart([pId, userData.user.id]))
    }

    const isInCart = (pId) => {
        // console.log(cartProducts);
        if (cartProducts?.length > 0) {
            if (cartProducts.find( (c) => c.product.id == pId) ) {
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
        dispatch(changeCountByValueAction([cartItem.id, n]))

        axios.put(`${baseURL}/api/cart/${cartItem.id}/update-count`, JSON.stringify({
            count: newCount
        }, { Authorization: `Bearer ${userData.token}` })).then(res => console.log(res));
    }

    /******************************************* Saved Products ***************************************************************************** */

    const isProductSaved = (productId) => {
        if (!saved.error) {
            let saved = savedProducts?.find((sProduct) => { return sProduct.id == productId });

            if (saved) {
                return true;
            }
            return false;
        }
    }

    const saveProduct = (productId) => {
        let product = products?.find((p) => p.id == productId);
        dispatch(addToSavedProducts(product));


        // add to saved
        axios.post(`${baseURL}/api/products/save/${userData.user.id}`, JSON.stringify({ product_id: productId },
            {
                haeders: authHeaders
            }
        )).catch(err => console.log(err));
    }

    const unsaveProduct = (productId) => {
        dispatch(removeFromSavedProducts(productId));


        // add to saved
        axios.post(`${baseURL}/api/products/unsave/${userData.user.id}`, JSON.stringify({
            "product_id": productId
        },
            {
                haeders: {
                    Authorization: `Bearer ${userData.user.token}`,
                    crossDomain: true
                }
            }
        )).catch(err => console.log(err));
    }


    useEffect(() => {
        if (userData.user) {
            dispatch(fetchCartItems(userData.user.id));
            dispatch(fetchSavedProducts(userData.user.id));

            console.log("done");
        }

        // if(!productsSl.loaded && productsSl.products.length === 0) {
        //     dispatch(fetchProducts("products"));
        // }
        // console.log(userData.user);

    }, [userData]);

    return (
        <>
            {userData.loading || cart.loading || saved.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> : <div className='products-container rounded-1 py-3'>
                <div className='d-flex justify-content-between  mb-3'>
                    <h4 id="productsContainerTop" className='pb-2'>Android Phones</h4>
                    <select name="order" id="order" className='sorting'
                        onChange={ (e) => {props.handleOrder(e.target.value)}  }
                    >
                        <option value="">Sort by popularity</option>
                        <option value="asc">Price: Low to Hight</option>
                        <option value="desc">Price: Hight to Low</option>
                    </select>
                </div>
                <div className="product-cards row flex-wrap g-3">
                    {
                        products?.map((prod) => {
                            return <Product
                                changeInCart={changeInCart}
                                addCart={addCart}
                                isInCart={isInCart}
                                key={prod.id}
                                product={prod}
                                isProductSaved={isProductSaved}
                                saveProduct={saveProduct}
                                unsaveProduct={unsaveProduct}

                            />
                        })
                    }
                </div>
            </div>}
        </>
    )

}
