import React, { useEffect, useState } from 'react'
import './index.css'
import Filter from './Filter'
import ProductsContainer from './ProductsContainer'
import axios from 'axios'
import { baseURL } from '../../config/config'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, productsDataSelector, setProducts } from './ProductsSlice'
import { CircularProgress } from '@mui/material'
import { searchQuerySelector } from './searchSlice'
import Categories from '../CategoryPage/Categories/Categories'
import CategoryPage from '../CategoryPage/CategoryPage'
export const lowPriceDefault = 20;
export const highPriceDefault = 10000;
export default function Store(props) {
    let title = useSelector(searchQuerySelector);
    console.log(title);
    const params = new URLSearchParams(
        title ? `title=${title}&pricelow=${lowPriceDefault}&pricehigh=${highPriceDefault}` : `pricelow=${lowPriceDefault}&pricehigh=${highPriceDefault}`
    );
    console.log(params);
    console.log(params.toString());

    const productsSl = useSelector((state) => state.products);
    const products = productsSl.products;
    const dispatch = useDispatch();

    // let [params, setParams] = useState({
    //     pricelow: 20,
    //     pricehigh: 10000
    // });

    let handleOrder = (order) => {
        console.log("handle order");
        console.log(order);
        if (order) {
            params.delete('orderbyprice');
            params.set('orderbyprice', order);
        }

        filter();
    }

    let clearFilter = () => {
        params.delete('brand');
        params.set('pricelow', lowPriceDefault);
        params.set('pricehigh', highPriceDefault);
        filter();
    }

    let handleBrand = (brand) => {
        if (params.has('brand'))
            params.set( 'brand', brand );
        else
            params.append('brand', brand );
    }

    let handlePrice = (priceLow, priceHigh) => {
        params.set('pricelow', priceLow);
        params.set('pricehigh', priceHigh);
    }

    let makeArgumentStr = () => {
        return params.toString();
    }

    let filter = () => {
        let argString = makeArgumentStr();
        // remove trailing &
        dispatch(fetchProducts(`products?${argString}`));
        // window.scrollTo(0, 1350);

        const anchor = document.querySelector('#productsContainerTop')
        anchor.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    useEffect(() => {
        // if (!productsSl.loaded && productsSl.products.length === 0) {
        //     dispatch(fetchProducts("products"));
        // }
    }, []);

    useEffect(() => {
        filter();
    }, [title]);

    return (
        <div className="row my-5 nobackground">
            <CategoryPage id={props.id}/>
            <div className="col-lg-3 col-md-4 col-sm-8 my-5">
                <Filter clearFilter={clearFilter} handleBrand={handleBrand} handlePrice={handlePrice} filter={filter} />
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12 my-5">
                <ProductsContainer handleOrder={handleOrder}  products={products} />
            </div>
        </div>
    )
}
