import React, { useEffect, useState } from 'react';
import Account from '../Components/Account/Account';
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Button } from '@mui/material';
import { Container } from '@mui/material';
import TopSelling from '../Components/Account/TopSelling';
import { userDataSelector } from '../userSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseURL } from '../config/config';

const drawerWidth = 240;


export default function ReviewsIndex() {
    const { user } = useSelector(userDataSelector);
    const [deliveredProducts, setDeliveredProducts] = useState([]);
    const userId = user.id;

    useEffect(() => {
        const fetchDeliveredOrders = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/orders/user/${userId}/status/delivered`);
                console.log(response.data);
                
                const uniqueProducts = filterUniqueProducts(response.data);
                
                setDeliveredProducts(uniqueProducts);
            } catch (error) {
                console.error('Error fetching delivered orders:', error);
            }
        };

        fetchDeliveredOrders();
    }, [userId]);
    
    const filterUniqueProducts = (products) => {
        const seenIds = new Set();
        const uniqueProducts = [];

        products.forEach(product => {
            if (!seenIds.has(product.id)) {
                seenIds.add(product.id);
                uniqueProducts.push(product);
            }
        });

        return uniqueProducts;
    };
    
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
                    mt: 5,
                    overflowY: 'auto',
                    maxHeight: 'calc(100vh - 80px)',
                    }}
                >
                    {/* <Toolbar /> */}

                    {deliveredProducts.length === 0 ? (
                            <div className='d-flex justify-content-center align-items-center flex-column h-100'>
                                <img src="https://www.jumia.com.eg/assets_he/images/review.e9fae2f3.svg" alt="" />
                                <h6 className='mt-3'>You have no orders waiting for feedback</h6>
                                <p className='mt-2 w-50 text-center'>After getting your products delivered, you will be able to rate and review them. Your feedback will be published on the product page to help all Jumia's users get the best shopping experience!</p>
                                <a href="#">
                                    <Button variant="contained" sx={{ fontSize: 18, backgroundColor: '#f68b1e', '&:hover': { backgroundColor: '#e07e1b' } }}>CONTINUE SHOPPING</Button>
                                </a>
                            </div>
                        ) : (
                            <>
                                {deliveredProducts.map((product, index) => (
                                    <div class="mb-3 p-2 rounded d-flex flex-row bg-light justify-content-evenly align-items-center" key={index}>
                                        <div className='me-2 pe-3 border-end border-3' style={{width: '40%'}}>
                                            <img src={baseURL + '/' + 'storage/' + product.thumbnail} alt={product.title} className='rounded mw-100'/>
                                        </div>
                                        <div class=" w-50 ms-1">
                                            <h5 class="card-title mb-1">{product.title}</h5>
                                            <small className='text-success'>${product.price}</small>
                                            {/* <small className='text-muted w-25' style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{product.desc}</small> */}
                                            <a href="http://127.0.0.1:3000/product/id" class="btn btn-primary text-white d-block mt-3" style={{ backgroundColor: '#f68b1e', '&:hover': { backgroundColor: '#e07e1b' }, borderColor: '#f68b1e'}}>Go to Review</a>
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}
                </Box>
            </Box>
        </Container>
        <TopSelling />
        </>
        
    )
}
