import React from 'react';
import Account from '../Components/Account/Account';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import '@mui/icons-material';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import TopSelling from '../Components/Account/TopSelling';
import { Container } from '@mui/material';

const drawerWidth = 240;

export default function MyAccount() {

    return (
        <>
        <Container style={{display: 'flex', marginBottom: '50px'}}>
            <Box sx={{ display: "flex" }}>

                <Account />
                {/* <Toolbar /> */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                    }}
                >
                    <div className="row gap-3">
                            <div className="card col-12 col-lg-5 p-0">
                                <h5 class="card-header">ACCOUNT DETAILS</h5>
                                <div class="card-body">
                                    <h6 class="card-title">Mahmoud Dwidar</h6>
                                    <p class="card-text text-muted">mahmouddwidar55@gmail.com</p>
                                </div>
                            </div>
                            <div className="card col-12 col-lg-5 p-0">
                                <h5 class="card-header">ADDRESS BOOK</h5>
                                <div class="card-body">
                                    <h6 class="card-title">Your default shipping address:</h6>
                                    <p class="card-text text-muted">No default shipping address available.</p>
                                    <a href="#">
                                <Button sx={{color: '#f68b2c', '&:hover': {backgroundColor: '#fcdbb9'} }} variant="text" className="mt-2">ADD DEFAULT ADDRESS</Button>
                                    </a>
                                </div>
                            </div>
                            <div className="card col-12 col-lg-5 p-0">
                                <h5 class="card-header">JUMIA STORE CREDIT</h5>
                                <div class="card-body" style={{ color: '#264996'}}>
                                    <h6 class="card-title">
                                    <CreditScoreIcon className='me-1'/> 
                                        Jumia Pay Balance:EGP 0.00
                                    </h6>
                                </div>
                            </div>
                            <div className="card col-12 col-lg-5 p-0">
                                <h5 class="card-header">NEWSLETTER PREFERENCES</h5>
                                <div class="card-body">
                                    <h6 class="card-title">You are currently not subscribed to any of our newsletters.</h6>
                                    <a href="#">
                                        <Button sx={{color: '#f68b2c', '&:hover': {backgroundColor: '#fcdbb9'} }} variant="text" className="mt-2">EDIT NEWSLETTER PREFERENCES</Button>
                                    </a>
                                </div>
                            </div>
                        </div>
                </Box>
            </Box>
            </Container>
            <TopSelling />
            </>
    )
}
