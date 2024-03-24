
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "./Style.module.css";
import CardServices from "../card/CardServices";
import Reviews from "./Reviews"; // Import the Reviews component
import ReviewForm from "./ReviewForm"; // Import the ReviewForm component
import { fetchProducts, productsDataSelector, fetchReviewsByProductId, reviewsDataSelector, resetReviewsAction } from '../ProductsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { CircularProgress, Rating } from '@mui/material';
import axios from 'axios';
import { addProductToCart, cartDataSelector, changeCountByValueAction } from "../../CartPage/cartSlice";
import { userDataSelector, userSlice } from "../../../userSlice";
import { baseURL, storageURL } from "../../../config/config";
import Carousel from 'react-bootstrap/Carousel';
import { authHeaders } from "../../../config/axiosConfig";


function ProductDetailView(props) {
    const { id } = useParams();
    const [activeImg, setActiveImg] = useState("");
    const userData = useSelector(userDataSelector);
    const dispatch = useDispatch();
    const productsSl = useSelector((state) => state.products);
    const products = useSelector(productsDataSelector);
    const product = products.find((p) => p.id == id);
    const loading = useSelector((state) => state.products.loading);
    const cart = useSelector(cartDataSelector);
    const cartProducts = cart.cart;
    const [showReviewForm, setShowReviewForm] = useState(false);
    const reviews = useSelector(reviewsDataSelector);

    const addCart = (pId) => {
        dispatch(addProductToCart([pId, userData.user.id]));
    };

    const isInCart = (pId) => {
        return cartProducts.some((c) => c.product.id == pId);
    };

    const changeInCart = (pId, n) => {
        const cartItem = cartProducts.find((c) => c.product.id == pId);
        if (cartItem) {
            const count = cartItem.count;
            const newCount = count + n;
            dispatch(changeCountByValueAction([cartItem.id, n]));
            axios.put(
                `${baseURL}/api/cart/${cartItem.id}/update-count`,
                JSON.stringify({ count: newCount }),
                { Authorization: `Bearer ${userData.token}` }
            );
        } else {
            console.error("Product not found in cart");
        }
    };
    // console.log();



    console.log(productsSl.reviews);
    return (
        <>
            {productsSl.loading || cart.loading ? (
                <CircularProgress sx={{ marginLeft: '50%' }} />
            ) : (
                <div className="container-fluid mt-3 productDetail">
                    <div className="row bg-gray">
                        <div className="col-md-8 bg-white">
                            <div className="row mb-3">
                                <div className="col-12 text-center">
                                    <Carousel style={{ maxWidth: '100%' }}>
                                        {product.images.map((img, index) => (
                                            <Carousel.Item key={index}>
                                                <img
                                                    className="d-block w-100 my-3"
                                                    src={`${storageURL}${img.image}`}
                                                    alt={`Slide ${index}`}
                                                    onClick={() => setActiveImg(img.image)}
                                                    style={{ cursor: 'pointer', height: '400px', objectFit: 'contain' }}
                                                />
                                            </Carousel.Item>
                                        ))}
                                    </Carousel>
                                </div>
                                <div className="col-md-7 col-lg-12">
                                    <h1 className="product-name">{product.title}</h1>
                                    <div className="d-flex align-items-center mb-3">
                                        <Rating name="read-only" value={Math.round(product.rating * 2) / 2} precision={0.5} readOnly />
                                        <span className="ml-2">({Math.round(product.rating * 2) / 2})</span>
                                    </div>
                                    <div className="price mb-3">
                                        <span className="discounted-price d-block h4">
                                            Discounted Price: ${(product.price - (product.price * (product.discount / 100))).toFixed(2)}
                                        </span>
                                        <div className="d-flex align-items-center">
                                            <del className="original-price ml-2 d-block me-2">
                                                Original Price: ${product.price.toFixed(2)}
                                            </del>
                                            <small className="discount-badge badge ml-2" style={{ backgroundColor: '#ebb98669', color: '#f68b1ecc', fontSize: '14px' }}>
                                                {product.discount}% OFF
                                            </small>
                                        </div>
                                    </div>
                                    <small className=""> Shipping fees from EGP 20.00 to 6th of October (free delivery if order above EGP 200.00). Save 10 EGP on shipping with prepaid payment</small>
                                    <div className="my-3">
                                        {product.stock && !isInCart(id) ? (
                                            <button type="button"
                                                className="button btn btn-warning"
                                                onClick={() => addCart(id)}
                                            >
                                                <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                                            </button>
                                        ) : product.stock && isInCart(id) ? (
                                            <div className="mb-3 d-flex align-items-center">
                                                {isInCart(id) && (
                                                    <>
                                                        <button
                                                            className="btn btn-sm me-3 shadow"
                                                            onClick={() => changeInCart(id, -1)}
                                                            disabled={cartProducts.find(c => c.product.id == id)?.count === 0}
                                                            style={{ backgroundColor: '#e07e1b', color: '#FFF' }}
                                                        >
                                                            <FontAwesomeIcon icon={faMinus} />
                                                        </button>
                                                        <p className="me-3 ">{cartProducts.find((c) => c.product.id == id)?.count}</p>
                                                        <button
                                                            className="btn btn-sm shadow"
                                                            onClick={() => changeInCart(id, 1)}
                                                            style={{ backgroundColor: '#e07e1b', color: '#FFF' }}
                                                        >
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        ) : (
                                            <div className="quantity">Out of stock</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <CardServices />
                        </div>
                    </div>
                    <div className="productDetail p-2 rounded mt-2 bg-white">
                        <h4>Product Details:</h4>
                        <hr className="mb-4" />
                        <p className="ps-2">{product.desc}</p>
                    </div>
                    <div className="container-fluid mt-3 productDetail">
                        <div className="row">
                            <div className="col-md-8">
                                {/* Existing product details and description */}
                            </div>
                            <div className="col-md-4">
                                {/* Existing CardServices component */}
                            </div>
                        </div>
                        <div className="row">
                            <Reviews productId={id} />

                            {!userData.user ? "" : <div className="col">
                                <button className="btn btn-warning my-3" onClick={() => setShowReviewForm(true)}>Write a Review</button>
                                {showReviewForm && (
                                    <ReviewForm productId={id} />
                                )}
                            </div>
                            }
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProductDetailView;

