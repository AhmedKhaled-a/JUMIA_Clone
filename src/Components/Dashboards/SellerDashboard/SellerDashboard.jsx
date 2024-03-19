import React from 'react'
import MainDash from './MainDash/MainDash'
import RightSide from './RightSide/RightSide'
import Sidebar from './Sidebar'

export default function SellerDashboard() {
    return (
        <>
            <div className="row">

                <div className="App">
                    <div className="AppGlass">
                        <Sidebar />
                        <MainDash />
                        <RightSide />
                    </div>
                </div>

            </div>

        </>
    )
}
