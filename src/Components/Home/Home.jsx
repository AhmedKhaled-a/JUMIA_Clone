import React, { useContext, useState } from 'react'
import ItemCarousel from './ItemCarousel'
import CategoryList from './CategoryList'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAward, faBuilding, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons'
import About from './About'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 1024 },
        items: 6
    },
    desktop: {
        breakpoint: { max: 1024, min: 800 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 800, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export default function Home() {


    let { userData } = useState(null);
    // console.log(userData);
    return (
        <>
            {/* FIRST SECTION => SLIDER WITH CATEGORIES LIST */}
            <div className="row mb-5">
                <div className='col-lg-2 col-md-3 col-sm-12 mb-4'>
                    <CategoryList />
                </div>
                <div className="col-lg-8 col-md-9 col-sm-12 mb-4">
                    <ItemCarousel />
                </div>
                <div className="col-lg-2 col-md-6 col-sm-12 mb-4 d-sm-none d-md-none d-lg-block d-sm-block">
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
                    <div className='mb-5'><img src={process.env.PUBLIC_URL + '/images/buy now.gif'} className='w-100 rounded-1' /></div>
                </div>
            </div>

            {/* ADS */}

            <div className='ad-horizontal mb-5'>
                <a href=""><img src={process.env.PUBLIC_URL + '/images/1200x200.png'} className='w-100 m-0' /></a>
            </div>
            <div className='ad-horizontal mb-5'>
                <a href=""><img src={process.env.PUBLIC_URL + '/images/1200x200EN.png'} className='w-100 m-0' /></a>
            </div>
            <div className='ad-cards'>
                <img className='ad-card m-0' src={process.env.PUBLIC_URL + '/images/ad cards/1.png'} alt="" />
                <img className='ad-card m-0' src={process.env.PUBLIC_URL + '/images/ad cards/3.png'} alt="" />
                <img className='ad-card m-0' src={process.env.PUBLIC_URL + '/images/ad cards/2.png'} alt="" />
                <img className='ad-card m-0' src={process.env.PUBLIC_URL + '/images/ad cards/4.png'} alt="" />
                <img className='ad-card m-0' src={process.env.PUBLIC_URL + '/images/ad cards/5.png'} alt="" />
                <img className='ad-card m-0' src={process.env.PUBLIC_URL + '/images/ad cards/6.png'} alt="" />
            </div>

            {/* carousel */}
            <Carousel responsive={responsive} className='my-5 ad-cards rounded-1' infinite={true} autoPlay={true} swipeable={true}>
                <div className='ad-card rounded-1'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/1.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/2.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/3.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/4.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/5.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/6.gif'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/7.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/8.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/9.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/10.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/11.png'} alt="" />
                </div>
            </Carousel>

            {/* <Slider {...sliderSettings} className='my-5 ad-cards rounded-1'>
                <div className='ad-card rounded-1'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/1.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/2.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/3.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/4.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/5.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/6.gif'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/7.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/8.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/9.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/10.png'} alt="" />
                </div>
                <div className='ad-card'>
                    <img className='m-0' src={process.env.PUBLIC_URL + '/images/multi carousel/11.png'} alt="" />
                </div>
            </Slider> */}
            {/* ABOUT */}

            <About />
        </>
    )
}
