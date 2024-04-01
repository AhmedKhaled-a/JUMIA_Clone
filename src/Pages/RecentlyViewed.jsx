import React, { useEffect, useState } from 'react';
import Account from "../Components/Account/Account";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Container } from '@mui/material';
import TopSelling from "../Components/Account/TopSelling";
import { userDataSelector } from '../userSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseURL } from '../config/config';
import {  CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

export default function RecentlyViewed() {

    const { user } = useSelector(userDataSelector);
    const [viewedProducts, setViewedProducts] = useState([]);
    const [productData, setProductData] = useState([]);

    const userId = user.id;

    useEffect(() => {
        const fetchViewedProducts = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/product/user-viewed/${userId}`);
                setViewedProducts(response.data.Viewed_Product);
            } catch (error) {
                console.error('Error fetching viewed products:', error);
            }
        };
        fetchViewedProducts();
    }, [userId]);

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productDataPromises = viewedProducts.map(async (viewedProduct) => {
                    console.log(viewedProduct.product_id);
                    const response = await axios.get(`http://127.0.0.1:8000/api/products/${viewedProduct.product_id}`);
                    console.log(response.data);
                    return response.data;
                });
                const resolvedProductData = await Promise.all(productDataPromises);
                setProductData(resolvedProductData);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };
        if (viewedProducts.length > 0) {
            fetchProductData();
        }
    }, [viewedProducts]);

    return (
        <>
            <Container style={{display: 'grid', marginBottom: '50px'}}>
                <Box sx={{ display: "flex" }}>
                    <Account />
                    <Box
                        component="main"
                        sx={{
                            flexGrow: 1,
                            p: 3,
                            width: { sm: `calc(100% - ${drawerWidth}px)` },
                            mt: 5,
                        }}
                    >
                        {viewedProducts.length === 0 ? (
                            <div>
                                <div className="d-flex justify-content-center align-items-center flex-column h-100">
                                    <img src="https://www.jumia.com.eg/assets_he/images/binoculars.389fc56a.svg" alt="" />
                                    <h6 className="mt-3">No Recently Viewed Products</h6>
                                    <p className="mt-2 w-50 text-center">
                                        You have no recently viewed products at the moment.
                                    </p>
                                    <a href="#">
                                        <Button
                                            variant="contained"
                                            sx={{
                                                fontSize: 18,
                                                backgroundColor: "#f68b1e",
                                                "&:hover": { backgroundColor: "#e07e1b" },
                                            }}
                                        >
                                            START SHOPPING
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className='d-flex justify-content-between align-items-center flex-wrap'>
                                {productData.map((product, index) => (
                                    <a href={`http://127.0.0.1:3000/product/${product.id}`} className='card-link my-3' style={{width: '45%'}} key={index}>
                                        <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    maxWidth="100%"
                                                    image={baseURL + '/storage/' + product.thumbnail}
                                                    alt={product.title}
                                                    className='p-0 m-0'
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                        {product.title}
                                                    </Typography>
                                                    <Typography variant="body" color="text.black" >
                                                        EGP {product.price}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </a>
                                ))}
                            </div>
                        )}
                    </Box>
                </Box>
            </Container>
            <TopSelling />
        </>
    );
}
