import React, { useEffect, useState } from 'react'
import './index.css'
import Filter from './Filter'
import ProductsContainer from './ProductsContainer'
import axios from 'axios'
import { baseURL } from '../../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, productsDataSelector, setProducts } from './ProductsSlice'


export default function Store() {
    // let [ products, setProducts] = useState(null);

    const products = useSelector(productsDataSelector);
    const dispatch = useDispatch();

    let [ params, setParams ] = useState({
        pricelow: 20,
        pricehigh: 10000
    });

    const getProducts = (url) => {
        axios.get(`${baseURL}/api/${url}`)
        .then( (res) => {
            console.log(res.data);
            dispatch(setProducts(res.data));
        })
        .catch((err) => console.log(err));
    }

    let handleBrand = (brand) => {
        setParams({...params, brand: brand})
    }

    let handlePrice = (priceLow, priceHigh) => {
        setParams({...params, pricelow: priceLow, pricehigh: priceHigh})
    }

    let makeArgumentStr= () => {
        let paramString = '';
        for (let key in params) {
            paramString += `${key}=${params[key]}&`
        }

        return paramString;
    }

    let filter = () => {
        let argString = makeArgumentStr();

        // remove trailing &
        if(argString[argString.length - 1] == '&' ) {
            argString.substring(argString.length - 2, argString.length - 1);
        }
        dispatch(fetchProducts(`products?${argString}`));
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        dispatch(fetchProducts("products"));
    }, []);

    return (
            <div className="row">              
                    <div className="col-3">
                        <Filter handleBrand={handleBrand}  handlePrice={handlePrice} filter={filter} />
                    </div>
                    <div className="col-9">
                        <ProductsContainer products={products} />
                    </div>
            </div>
    )
}
