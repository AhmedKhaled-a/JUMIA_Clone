import React, { useEffect, useState } from 'react'
import './index.css'
import Filter from './Filter'
import ProductsContainer from './ProductsContainer'
import axios from 'axios'
import { baseURL } from '../../config/config'


export default function Store() {
    let [ products, setProducts] = useState(null);
    let [ params, setParams ] = useState({
        pricelow: 99,
        pricehigh: 100000
    });

    const getProducts = (url) => {
        axios.get(`${baseURL}/api/${url}`)
        .then( (res) => {
            setProducts(res.data);
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
        getProducts(`products?${makeArgumentStr()}`);
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        getProducts("products");
    }, []);

    return (
        <>
            <div className="row">              
                    <div className="col-3">
                        <Filter handleBrand={handleBrand}  handlePrice={handlePrice} filter={filter} />
                    </div>
                    <div className="col-9">
                        <ProductsContainer products={products} />
                    </div>
            </div>
        </>
    )
}
