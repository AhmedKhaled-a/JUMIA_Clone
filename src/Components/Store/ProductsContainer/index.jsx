import React from 'react'
import './index.css'
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';


export default function ProductsContainer() {
    return (
        <>
            <div className='products-container rounded-1'>
                <h4 className='pb-2  border-bottom'>Android Phones</h4>
                <div className="product-cards row flex-wrap g-3">
                    <div class="product-card col-3 p-0">
                            <div class="product-image-container overflow-hidden">
                                <a href=""><img className='w-100 product-imgage' src={process.env.PUBLIC_URL + './images/products/1.jpg'} alt="Phone Image" /></a>
                            </div>
                            <div class="product-details p-2">
                                <p class="product-title text-muted mb-1">Samsung Galaxy A24 - 6.5-inch 128GB/6GB Dual Sim 4G Mobile Phone - Silver</p>
                                <p class="product-price mb-1 fw-semibold">EGP 8000</p>
                                <div className="d-flex align-items-center">
                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    <p className='m-0 ms-1 text-muted'>(3)</p>
                                </div>
                            </div>
                            <button class="">Add to Cart</button>
                            <span className='save-icon'><FontAwesomeIcon icon={faHeart} color='orange'/></span>
                    </div>
                    <div class="product-card col-3 p-0">
                            <div class="product-image-container overflow-hidden">
                                <a href=""><img className='w-100 product-imgage' src={process.env.PUBLIC_URL + './images/products/1.jpg'} alt="Phone Image" /></a>
                            </div>
                            <div class="product-details p-2">
                                <p class="product-title text-muted mb-1">Samsung Galaxy A24 - 6.5-inch 128GB/6GB Dual Sim 4G Mobile Phone - Silver</p>
                                <p class="product-price mb-1 fw-semibold">EGP 8000</p>
                                <div className="d-flex align-items-center">
                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    <p className='m-0 ms-1 text-muted'>(3)</p>
                                </div>
                            </div>
                            <button class="">Add to Cart</button>
                            <span className='save-icon'><FontAwesomeIcon icon={faHeart} color='orange'/></span>
                    </div>
                    <div class="product-card col-3 p-0">
                            <div class="product-image-container overflow-hidden">
                                <a href=""><img className='w-100 product-imgage' src={process.env.PUBLIC_URL + './images/products/1.jpg'} alt="Phone Image" /></a>
                            </div>
                            <div class="product-details p-2">
                                <p class="product-title text-muted mb-1">Samsung Galaxy A24 - 6.5-inch 128GB/6GB Dual Sim 4G Mobile Phone - Silver</p>
                                <p class="product-price mb-1 fw-semibold">EGP 8000</p>
                                <div className="d-flex align-items-center">
                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    <p className='m-0 ms-1 text-muted'>(3)</p>
                                </div>
                            </div>
                            <button class="">Add to Cart</button>
                            <span className='save-icon'><FontAwesomeIcon icon={faHeart} color='orange'/></span>
                    </div>
                    <div class="product-card col-3 p-0">
                            <div class="product-image-container overflow-hidden">
                                <a href=""><img className='w-100 product-imgage' src={process.env.PUBLIC_URL + './images/products/1.jpg'} alt="Phone Image" /></a>
                            </div>
                            <div class="product-details p-2">
                                <p class="product-title text-muted mb-1">Samsung Galaxy A24 - 6.5-inch 128GB/6GB Dual Sim 4G Mobile Phone - Silver</p>
                                <p class="product-price mb-1 fw-semibold">EGP 8000</p>
                                <div className="d-flex align-items-center">
                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    <p className='m-0 ms-1 text-muted'>(3)</p>
                                </div>
                            </div>
                            <button class="">Add to Cart</button>
                            <span className='save-icon'><FontAwesomeIcon icon={faHeart} color='orange'/></span>
                    </div>
                    <div class="product-card col-3 p-0">
                            <div class="product-image-container overflow-hidden">
                                <a href=""><img className='w-100 product-imgage' src={process.env.PUBLIC_URL + './images/products/1.jpg'} alt="Phone Image" /></a>
                            </div>
                            <div class="product-details p-2">
                                <p class="product-title text-muted mb-1">Samsung Galaxy A24 - 6.5-inch 128GB/6GB Dual Sim 4G Mobile Phone - Silver</p>
                                <p class="product-price mb-1 fw-semibold">EGP 8000</p>
                                <div className="d-flex align-items-center">
                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    <p className='m-0 ms-1 text-muted'>(3)</p>
                                </div>
                            </div>
                            <button class="">Add to Cart</button>
                            <span className='save-icon'><FontAwesomeIcon icon={faHeart} color='orange'/></span>
                    </div>
                    <div class="product-card col-3 p-0">
                            <div class="product-image-container overflow-hidden">
                                <a href=""><img className='w-100 product-imgage' src={process.env.PUBLIC_URL + './images/products/1.jpg'} alt="Phone Image" /></a>
                            </div>
                            <div class="product-details p-2">
                                <p class="product-title text-muted mb-1">Samsung Galaxy A24 - 6.5-inch 128GB/6GB Dual Sim 4G Mobile Phone - Silver</p>
                                <p class="product-price mb-1 fw-semibold">EGP 8000</p>
                                <div className="d-flex align-items-center">
                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    <p className='m-0 ms-1 text-muted'>(3)</p>
                                </div>
                            </div>
                            <button class="">Add to Cart</button>
                            <span className='save-icon'><FontAwesomeIcon icon={faHeart} color='orange'/></span>
                    </div>
                    <div class="product-card col-3 p-0">
                            <div class="product-image-container overflow-hidden">
                                <a href=""><img className='w-100 product-imgage' src={process.env.PUBLIC_URL + './images/products/1.jpg'} alt="Phone Image" /></a>
                            </div>
                            <div class="product-details p-2">
                                <p class="product-title text-muted mb-1">Samsung Galaxy A24 - 6.5-inch 128GB/6GB Dual Sim 4G Mobile Phone - Silver</p>
                                <p class="product-price mb-1 fw-semibold">EGP 8000</p>
                                <div className="d-flex align-items-center">
                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    <p className='m-0 ms-1 text-muted'>(3)</p>
                                </div>
                            </div>
                            <button class="">Add to Cart</button>
                            <span className='save-icon'><FontAwesomeIcon icon={faHeart} color='orange'/></span>
                    </div>
                    <div class="product-card col-3 p-0">
                            <div class="product-image-container overflow-hidden">
                                <a href=""><img className='w-100 product-imgage' src={process.env.PUBLIC_URL + './images/products/1.jpg'} alt="Phone Image" /></a>
                            </div>
                            <div class="product-details p-2">
                                <p class="product-title text-muted mb-1">Samsung Galaxy A24 - 6.5-inch 128GB/6GB Dual Sim 4G Mobile Phone - Silver</p>
                                <p class="product-price mb-1 fw-semibold">EGP 8000</p>
                                <div className="d-flex align-items-center">
                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    <p className='m-0 ms-1 text-muted'>(3)</p>
                                </div>
                            </div>
                            <button class="">Add to Cart</button>
                            <span className='save-icon'><FontAwesomeIcon icon={faHeart} color='orange'/></span>
                    </div>
                    <div class="product-card col-3 p-0">
                            <div class="product-image-container overflow-hidden">
                                <a href=""><img className='w-100 product-imgage' src={process.env.PUBLIC_URL + './images/products/1.jpg'} alt="Phone Image" /></a>
                            </div>
                            <div class="product-details p-2">
                                <p class="product-title text-muted mb-1">Samsung Galaxy A24 - 6.5-inch 128GB/6GB Dual Sim 4G Mobile Phone - Silver</p>
                                <p class="product-price mb-1 fw-semibold">EGP 8000</p>
                                <div className="d-flex align-items-center">
                                    <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
                                    <p className='m-0 ms-1 text-muted'>(3)</p>
                                </div>
                            </div>
                            <button class="">Add to Cart</button>
                            <span className='save-icon'><FontAwesomeIcon icon={faHeart} color='orange'/></span>
                    </div>
                </div>
            </div>
        </>
    )
}
