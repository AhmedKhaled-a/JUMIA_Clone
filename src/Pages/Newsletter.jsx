import React from 'react';
import Account from '../Components/Account/Account';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { Container } from '@mui/material';
import TopSelling from '../Components/Account/TopSelling';

const drawerWidth = 240;

export default function Newsletter() {
    const [languageValue, setLanguageValue] = React.useState('en');
    const [subscribeValue, setSubscribeValue] = React.useState('no');

    const handleLanguageChange = (event) => {
        setLanguageValue(event.target.value);
    };

    const handleSubscribeChange = (event) => {
        setSubscribeValue(event.target.value);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    return (
        <>
        <Container style={{display: 'flex', marginBottom: '50px'}}>
            <Box sx={{ display: "flex" }}>
                <Account />
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    {/* <Toolbar /> */}
                    <div className='d-flex flex-wrap flex-column justify-content-start align-items-start'>
                        <div className="card col-12 col-lg-5 p-0 m-3">
                            <h5 class="card-header">PREFERRED LANGUAGE</h5>
                            <div class="card-body">
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={languageValue}
                                        onChange={handleLanguageChange}
                                    >
                                        <FormControlLabel value="en" control={<Radio sx={{'&.Mui-checked': {color: '#f68b2c'} }} />} label="English" />
                                        <FormControlLabel value="ar" control={<Radio sx={{'&.Mui-checked': {color: '#f68b2c'} }} />} label="Arabic" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>

                        <div className="card col-12 col-lg-5 p-0 m-3">
                            <h5 class="card-header">SUBSCRIBE TO</h5>
                            <div class="card-body">
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="subscribe-controlled-radio-buttons-group"
                                        name="subscribe-controlled-radio-buttons-group"
                                        value={subscribeValue}
                                        onChange={handleSubscribeChange}
                                    >
                                        <FormControlLabel value="her" control={<Radio sx={{'&.Mui-checked': {color: '#f68b2c'} }} />} label="daily newsletters for her" />
                                        <FormControlLabel value="him" control={<Radio sx={{'&.Mui-checked': {color: '#f68b2c'} }} />} label="daily newsletters for him" />
                                        <FormControlLabel value="no" control={<Radio sx={{'&.Mui-checked': {color: '#f68b2c'} }} />} label="I don't want to receive daily newsletters" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>

                        <div className='m-3'>
                        {/* <Checkbox {...label} sx={{ '&.Mui-checked': {color: '#f68b2c'},}} /> */}
                        <FormControlLabel required control={<Checkbox sx={{ '&.Mui-checked': {color: '#f68b2c'},}} />} label="I agree to Jumia’s Privacy and Cookie Policy. You can unsubscribe from newsletters at any time." />
                        </div>

                        <a href="#" className='w-50 m-3'>
                            <Button variant="contained" sx={{color: '#FFFFFF',  width: '100%', padding: '12px', backgroundColor: "#f68b2c", '&:hover': {backgroundColor: '#e07e1b'} }} className="mt-2">SAVE</Button>
                        </a>
                    </div>
                </Box>
            </Box>
        </Container>
        <TopSelling />
        </>
    )
}