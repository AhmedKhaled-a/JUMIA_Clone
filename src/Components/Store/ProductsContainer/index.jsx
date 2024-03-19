import React, { useEffect, useState } from 'react'
import './index.css'
import Rating from '@mui/material/Rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { baseURL, storageURL } from '../../../config/config';
import Product from './Product/Product';
import axios from 'axios';


export default function ProductsContainer() {
    let [products, setProducts] = useState(null);
    useEffect(() => {
        axios.get(`${baseURL}/api/products`)
        .then( (res) => {
            console.log(res.data);
            setProducts(res.data);
        })
        .catch((err) => console.log(err));
    }, []); 
    return (
        <>
            <div className='products-container rounded-1'>
                <h4 className='pb-2  border-bottom'>Android Phones</h4>
                <div className="product-cards row flex-wrap g-3">
                    {      
                            products?.map((prod) => {
                                return <Product key={prod.id} product={prod} />
                            })
                    }
                </div>
            </div>
        </>
    )
}
