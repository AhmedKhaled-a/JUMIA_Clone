import React from 'react'
import './index.css'
import Filter from './Filter'
import ProductsContainer from './ProductsContainer'


export default function index() {
    return (
        <>
            <div className="row">              
                    <div className="col-3">
                        <Filter />
                    </div>
                    <div className="col-9">
                        <ProductsContainer/>
                    </div>
            </div>
        </>
    )
}
