import React from 'react';
import Account from '../Components/Account/Account';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import TopSelling from '../Components/Account/TopSelling';

const drawerWidth = 240;


export default function ReviewsIndex() {
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
                    mt: 5
                    }}
                >
                    {/* <Toolbar /> */}

                    <div>
                        <div className='d-flex justify-content-center align-items-center flex-column h-100'>
                            <img src="https://www.jumia.com.eg/assets_he/images/review.e9fae2f3.svg" alt="" />
                            <h6 className='mt-3'>You have no orders waiting for feedback</h6>
                            <p className='mt-2 w-50 text-center'>After getting your products delivered, you will be able to rate and review them. Your feedback will be published on the product page to help all Jumia's users get the best shopping experience!</p>
                            <a href="#">
                                <Button variant="contained" sx={{fontSize: 18, backgroundColor: '#f68b1e', '&:hover': {backgroundColor: '#e07e1b'} }}>CONTINUE SHOPPING</Button>
                            </a>
                        </div>
                    </div>
                </Box>
            </Box>
        </Container>
        <TopSelling />
        </>
        
    )
}
