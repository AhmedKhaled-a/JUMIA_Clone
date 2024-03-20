import React, { useState } from 'react'
import MainDash from './MainDash/MainDash'
import RightSide from './RightSide/RightSide'
import Sidebar from './Sidebar'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'

export default function SellerDashboard() {
    // get seller orders 

    // get products
    return (
        <>
                <div className="row">

                    <div className="App">
                        <div className="AppGlass">
                            <Sidebar />
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>

        </>
    )
}
