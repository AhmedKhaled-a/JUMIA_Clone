import React, { useState } from 'react'
import './index.css'
import Slider from '@mui/material/Slider';
import Rating from '@mui/material/Rating';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function valuetext(value) {
    return `${value}°C`;
}
const minDistance = 1000;

export default function Filter() {
    // BRAND HANDELING
    const [checkedBrands, setBrand] = useState([]);
    function handleBrands(event) {
        const { value, checked } = event.target

        if (checked) {
            setBrand(pre => [...pre, value])
        } else {
            setBrand(pre => {
                return [...pre.filter(brand => brand !== value)]
            })
        }
    }
    // console.log(checkedBrands);   // array of the checked brands

    //  PRICE RANGE HANDELING
    // const priceInput = document.querySelectorAll('.price-input input')
    // console.log(priceInput);
    const [priceValue, setPriceValue] = React.useState([99, 100000]);

    const handlePrice = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPriceValue([Math.min(newValue[0], priceValue[1] - minDistance), priceValue[1]]);
        } else {
            setPriceValue([priceValue[0], Math.max(newValue[1], priceValue[0] + minDistance)]);
        }
    };

    // RATING
    const [rating, setRating] = React.useState(2);


    return (
        <>
            {/* PRODUCTS Filter */}
            <div className="products-filter p-3 rounded-2">
                {/* CATEGORY NAME */}
                <h5>Category</h5>
                
                {/* BRANDS FILTER */}
                <div className="brands-filter mb-4 p-3 border-bottom">
                    <h6>BRAND</h6>
                    {/* SEARCH BRANDS */}
                    <input type="search" className='w-100 form-control mb-3 rounded-3' placeholder='Search' />
                    <div className='brands-list'>
                        <div className="brand mb-1">
                            <input type="checkbox" name='brand' value={'ACE'} onClick={handleBrands} />
                            <label className='ms-2'>ACE</label>
                        </div>
                        <div className="brand mb-1">
                            <input type="checkbox" name='brand' value={'APPLE'} onClick={handleBrands} />
                            <label className='ms-2'>APPLE</label>
                        </div>
                        <div className="brand mb-1">
                            <input type="checkbox" name='brand' value={'SAMSUNG'} onClick={handleBrands} />
                            <label className='ms-2'>SAMSUNG</label>
                        </div>
                        <div className="brand mb-1">
                            <input type="checkbox" name='brand' value={'brand4'} onClick={handleBrands} />
                            <label className='ms-2'>brand4</label>
                        </div>
                        <div className="brand mb-1">
                            <input type="checkbox" name='brand' value={'brand5'} onClick={handleBrands} />
                            <label className='ms-2'>brand5</label>
                        </div>
                        <div className="brand mb-1">
                            <input type="checkbox" name='brand' value={'brand6'} onClick={handleBrands} />
                            <label className='ms-2'>brand6</label>
                        </div>
                    </div>
                </div>

                {/*  PRICE FILTER  */}
                <div className="price-filter mb-3 p-3 border-bottom">
                    <div className="d-flex justify-content-between">
                        <h6 className='my-2'>PRICE (EGP)</h6>
                        <button className='apply-price'>APPLY</button>
                    </div>
                    <Slider
                        style={{ color: 'orange' }}
                        getAriaLabel={() => 'Minimum distance'}
                        value={priceValue}
                        onChange={handlePrice}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                        disableSwap
                        min={99}
                        max={100000}
                    />
                    <div class="price-input d-flex">
                        <div class="field d-flex align-items-center">
                            <span>Min</span>
                            <input type="number" class="input-min" value={priceValue[0]} />
                        </div>
                        <div class="separator">-</div>
                        <div class="field d-flex align-items-center">
                            <span>Max</span>
                            <input type="number" class="input-max" value={priceValue[1]} />
                        </div>
                    </div>
                </div>

                {/* RATING FILTER */}
                <div className="rating-filter mb-4 p-3 border-bottom">
                    <h6>PRODUCT RATING</h6>
                    <Rating
                        name="rating"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                            // console.log(event.target.value); to get the rating value
                        }}
                    />
                </div>

                {/* DISCOUNT CHECK */}
                <div className="discount-filter mb-4 p-3 border-bottom">
                    <h6>DISCOUNT</h6>
                    <input type="checkbox" name='discount' />
                    <label className='ms-2'>Show only discounted items</label>
                </div>

                {/* DISCOUNT PERCENTAGE */}
                <div className="discount-percentage">
                    <h6>DISCOUNT PERCENTAGE</h6>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="50%" control={<Radio style={{color:'orange'}}/>} label="50% or more" />
                            <FormControlLabel value="40%" control={<Radio style={{color:'orange'}}/>} label="40% or more" />
                            <FormControlLabel value="30%" control={<Radio style={{color:'orange'}}/>} label="30% or more" />
                            <FormControlLabel value="20%" control={<Radio style={{color:'orange'}}/>} label="20% or more" />
                            <FormControlLabel value="10%" control={<Radio style={{color:'orange'}}/>} label="10% or more" />
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>
        </>
    )
}





