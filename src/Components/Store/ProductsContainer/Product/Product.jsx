import React from 'react'
import { storageURL } from '../../../../config/config'
import { Rating } from '@mui/material';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddIcon from '@mui/icons-material/Add';

export default function Product(props) {
    let { id, title, price, rating, thumbnail } = props.product;

    return (
        <div class="product-card col-4 p-0" id={id}>
            <div class="product-image-container overflow-hidden">
                <a href="">
                    <img className='w-100 product-image' height="240" src={`${storageURL}${thumbnail}`} alt="Phone Image" />
                </a>
            </div>
            <div class="product-details p-2">
                <p class="product-title text-muted mb-1">{title}</p>
                <p class="product-price mb-1 fw-semibold">{price}$</p>
                <div className="d-flex align-items-center">
                    <Rating name="half-rating-read" value={ Math.round(rating*2)/2} precision={0.5} />
                    <p className='m-0 ms-1 text-muted'>({ Math.round(rating*2)/2 })</p>
                </div>
            </div>
            {props.isInCart(id) ? <button onClick={() => {props.incrementInCart(id)}} class="bg-primary"><AddIcon/></button> : <button onClick={() => {props.addCart(id)}} class="">Add to Cart</button>}
            <span className='save-icon'><FontAwesomeIcon icon={faHeart} color='orange' /></span>
        </div>
    )
}
