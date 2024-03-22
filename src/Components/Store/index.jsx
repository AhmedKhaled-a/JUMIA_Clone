import React, { useEffect, useState } from 'react'
import './index.css'
import Filter from './Filter'
import ProductsContainer from './ProductsContainer'
import axios from 'axios'
import { baseURL } from '../../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, productsDataSelector, setProducts } from './ProductsSlice'
import { CircularProgress } from '@mui/material'


export default function Store() {
    // let [ products, setProducts] = useState(null);

    const products = useSelector(productsDataSelector);
    const dispatch = useDispatch();

    let [params, setParams] = useState({
        pricelow: 20,
        pricehigh: 10000
    });

    let handleBrand = (brand) => {
        setParams({ ...params, brand: brand })
    }

    let handlePrice = (priceLow, priceHigh) => {
        setParams({ ...params, pricelow: priceLow, pricehigh: priceHigh })
    }

    let makeArgumentStr = () => {
        let paramString = '';
        for (let key in params) {
            paramString += `${key}=${params[key]}&`
        }

        return paramString;
    }

    let filter = () => {
        let argString = makeArgumentStr();

        // remove trailing &
        if (argString[argString.length - 1] == '&') {
            argString.substring(argString.length - 2, argString.length - 1);
        }
        dispatch(fetchProducts(`products?${argString}`));
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        dispatch(fetchProducts("products"));
    }, []);

    return (products.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> :
        <div className="row my-5">
            <div className="col-lg-3 col-md-4 col-sm-8 my-5">
                <Filter handleBrand={handleBrand} handlePrice={handlePrice} filter={filter} />
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12 my-5">
                <ProductsContainer products={products} />
            </div>
        </div>
    )
}
