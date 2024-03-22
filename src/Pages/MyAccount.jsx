import React from 'react';
import { useSelector } from 'react-redux';
import Account from '../Components/Account/Account';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import '@mui/icons-material';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import TopSelling from '../Components/Account/TopSelling';
import { Container } from '@mui/material';
import { userDataSelector } from '../userSlice';

const drawerWidth = 240;

export default function MyAccount() {
    const { user } = useSelector(userDataSelector);
    console.log(user);

    return (
        <>
            <Container style={{ display: 'flex', marginBottom: '50px' }}>
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
                                <h6 class="card-header">ACCOUNT DETAILS</h6>
                                <div class="card-body">
                                    <h6 class="card-title">{user && user.fullname}</h6>
                                    <p class="card-text text-muted">{user && user.email}</p>
                                </div>
                            </div>
                            {/* ---------- Address Card ---------- */}
                            <div className="card col-12 col-lg-5 p-0">
                                <h6 class="card-header">ADDRESS BOOK</h6>
                                { user && user.address_country ? (
                                    <div class="card-body">
                                    <h6 class="card-title">Your default shipping address:</h6>
                                    <p class="card-text text-muted">{user.address_district + ', ' + user.address_city + ', ' + user.address_country}</p>
                                </div>
                                ) : (
                                    <div class="card-body">
                                        <h6 class="card-title">Your default shipping address:</h6>
                                        <p class="card-text text-muted">No default shipping address available.</p>
                                        <a href="#">
                                            <Button sx={{ color: '#f68b2c', '&:hover': { backgroundColor: '#fcdbb9' } }} variant="text" className="mt-2">ADD DEFAULT ADDRESS</Button>
                                        </a>
                                    </div>
                                )}

                            </div>
                            <div className="card col-12 col-lg-5 p-0">
                                <h6 class="card-header">JUMIA STORE CREDIT</h6>
                                <div class="card-body" style={{ color: '#264996' }}>
                                    <h6 class="card-title">
                                        <CreditScoreIcon className='me-1' />
                                        Jumia Pay Balance:EGP 0.00
                                    </h6>
                                </div>
                            </div>
                            <div className="card col-12 col-lg-5 p-0">
                                <h6 class="card-header">NEWSLETTER PREFERENCES</h6>
                                <div class="card-body">
                                    <h6 class="card-title">You are currently not subscribed to any of our newsletters.</h6>
                                    <a href="#">
                                        <Button sx={{ color: '#f68b2c', '&:hover': { backgroundColor: '#fcdbb9' } }} variant="text" className="mt-2">EDIT NEWSLETTER PREFERENCES</Button>
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
