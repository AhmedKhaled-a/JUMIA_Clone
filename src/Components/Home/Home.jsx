import React from 'react'
import './HomeStyles.js';
import ItemCarousel from './ItemCarousel'
import CategoryList from './CategoryList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faBuilding, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons'
import About from './About'
import homeStyles from './HomeStyles.js';



export default function Home() {
    const classes = homeStyles();
    return (
        <div className={classes.container}>
            {/* FIRST SECTION => SLIDER WITH CATEGORIES LIST */}

            <div className="row mb-5">
                <div className='col-2'>
                    <CategoryList />
                </div>
                <div className="col-8">
                    <ItemCarousel />
                </div>
                <div className="col-2">
                    <div className='home-info mb-5 rounded-1 h-50'>
                        <div className='d-flex mb-4'>
                            <div><FontAwesomeIcon icon={faBuilding} className='icon-orange fs-2 me-3' /></div>
                            <div className="info">
                                <h6 className='m-0'>Sell on JUMIA</h6>
                                <p className='text-muted' style={{ fontSize: 11, margin: 0 }}>And Grow Your Business</p>
                            </div>
                        </div>
                        <div className='d-flex mb-4'>
                            <div><FontAwesomeIcon icon={faMoneyCheckDollar} className='icon-orange fs-2 me-3' /></div>
                            <div className="info">
                                <h6 className='m-0'>Installments</h6>
                                <p className='text-muted' style={{ fontSize: 11, margin: 0 }}>With Your Bank</p>
                            </div>
                        </div>
                        <div className='d-flex'>
                            <div><FontAwesomeIcon icon={faAward} className='icon-orange fs-2 me-3' /></div>
                            <div className="info">
                                <h6 className='m-0'>Warranty</h6>
                                <p className='text-muted' style={{ fontSize: 11, margin: 0 }}>On Your Purchases</p>
                            </div>
                        </div>
                    </div>
                    <div><img src={process.env.PUBLIC_URL + '/images/buy now.gif'} className='w-100 rounded-1' /></div>
                </div>
            </div>

            {/* ADS */}
            
            <div className='ad-horizontal mb-5'>
                <a href=""><img src={process.env.PUBLIC_URL + '/images/1200x200.png'} className='w-100' /></a>
            </div>
            <div className='ad-horizontal mb-5'>
                <a href=""><img src={process.env.PUBLIC_URL + '/images/1200x200EN.png'} className='w-100' /></a>
            </div>
            <div className='ad-cards'>
                <img className='ad-card' src={process.env.PUBLIC_URL + '/images/ad cards/1.png'} alt="" />
                <img className='ad-card' src={process.env.PUBLIC_URL + '/images/ad cards/3.png'} alt="" />
                <img className='ad-card' src={process.env.PUBLIC_URL + '/images/ad cards/2.png'} alt="" />
                <img className='ad-card' src={process.env.PUBLIC_URL + '/images/ad cards/4.png'} alt="" />
                <img className='ad-card' src={process.env.PUBLIC_URL + '/images/ad cards/5.png'} alt="" />
                <img className='ad-card' src={process.env.PUBLIC_URL + '/images/ad cards/6.png'} alt="" />
            </div>

            {/* ABOUT */}

            <About/>
        </div>
    )
}
