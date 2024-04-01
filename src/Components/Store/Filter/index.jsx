import React, { useEffect, useState } from 'react'
import './index.css'
import Slider from '@mui/material/Slider';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';
import { baseURL } from '../../../config/config';
import { Box, Button } from '@mui/material';
import { highPriceDefault, lowPriceDefault } from '..';

function valuetext(value) {
    return value;
}
const minDistance = 300;

export default function Filter(props) {

    // BRAND HANDELING
    const [brands, setBrands] = useState([]);
    // const [priceValue, setPriceValue] = useState([99, 10000]);


    useEffect(() => {
        axios.get(`${baseURL}/api/products/get-brands`)
            .then((res) => {
                // console.log(res.data);
                setBrands(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    //  PRICE RANGE HANDELING
    // const priceInput = document.querySelectorAll('.price-input input')
    // console.log(priceInput);

    const [priceValue, setPriceValue] = React.useState([20, 10000]);

    const handleChange1 = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setPriceValue([Math.min(newValue[0], priceValue[1] - minDistance), priceValue[1]]);
        } else {
            setPriceValue([priceValue[0], Math.max(newValue[1], priceValue[0] + minDistance)]);
        }
    };
    
    return (
        <>
            {/* PRODUCTS Filter */}
            <div className="products-filter p-3 rounded-2">
                {/* CATEGORY NAME */}
                <h5>Category</h5>

                {/* BRANDS FILTER */}
                <div className="brands-filter mb-4 p-3 border-bottom">
                    {/* SEARCH BRANDS */}
                    {/* <input type="search" className='w-100 form-control mb-3 rounded-3' placeholder='Search' /> */}
                    <div className='brands-list'>

                        <FormControl>
                            <FormLabel id="demo-radio-buttons-group-label">BRAND</FormLabel>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="brandFilter"
                                onChange={(e) => { props.handleBrand(e.target.value) }}
                            >
                                {
                                    brands.map((brand, index) => {
                                        return <FormControlLabel key={index} value={brand.brand} control={<Radio />} label={brand.brand} />
                                    })
                                }
                            </RadioGroup>
                        </FormControl>

                    </div>
                </div>

                {/*  PRICE FILTER  */}
                <div className="price-filter mb-3 p-3 border-bottom">
                    <Box sx={{ width: "100"  }}>
                        <Slider
                            getAriaLabel={() => 'Minimum distance'}
                            max={10000}
                            min={20}
                            shiftStep={100}
                            defaultValue={priceValue}
                            onChange={handleChange1}
                            valueLabelDisplay="auto"
                            getAriaValueText={valuetext}
                            onChangeCommitted={() => {props.handlePrice(priceValue[0] , priceValue[1])}}
                            disableSwap
                        />
                    </Box>
                    <div class="price-input d-flex space-between">
                        <div class="field d-flex align-items-center">
                            <span>Min</span>
                            <input type="text"  class="input-min" value={priceValue[0]} />
                        </div>
                        
                        <div className="separator p-0 m-0">-</div>
                        <div className="field d-flex align-items-center">
                            <span>Max</span>
                            <input type="number" class="input-max" value={priceValue[1]} />
                        </div>
                    </div>
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
                    {/* <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="50%" control={<Radio style={{ color: 'orange' }} />} label="50% or more" />
                            <FormControlLabel value="40%" control={<Radio style={{ color: 'orange' }} />} label="40% or more" />
                            <FormControlLabel value="30%" control={<Radio style={{ color: 'orange' }} />} label="30% or more" />
                            <FormControlLabel value="20%" control={<Radio style={{ color: 'orange' }} />} label="20% or more" />
                            <FormControlLabel value="10%" control={<Radio style={{ color: 'orange' }} />} label="10% or more" />
                        </RadioGroup>
                    </FormControl> */}
                </div>
                
                <Box sx={{ display: 'flex' }} flexDirection={'row'} gap={4} justifyContent={'space-between'} >
                <Button variant="contained" onClick={() => {props.clearFilter();setPriceValue([lowPriceDefault, highPriceDefault])  }}>clearFilter</Button>

                <Button variant="contained" onClick={props.filter}>Filter</Button>
                </Box>
            </div>
        </>
    )
}





