import React, { useEffect, useState } from 'react'
import { Box, Container, Typography, Divider } from '@mui/material'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from '../carouselResponsive';
import Category from './Category/Category';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    carContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
})
export default function Categories() {
    let classes = useStyles();
    let [categories, setCategories] = useState([]);
    useEffect(() => {
        setCategories([
            {
                id: 1,
                name: 'Android Phones',
                super_category_id: null,
                category_thumb: 'https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Phones/EN/Android_Phones.png',
            },
            {
                id: 2,
                name: 'IOS Phones',
                super_category_id: null,
                category_thumb: 'https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Phones/EN/iOS_Phones.png',
            },
            {
                id: 3,
                name: 'Tablets',
                super_category_id: null,
                category_thumb: 'https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Phones/EN/Tablets.png',
            },

            {
                id: 4,
                name: 'Cell Phones',
                super_category_id: null,
                category_thumb: 'https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Phones/EN/Cell_Phones.png',
            },

            {
                id: 5,
                name: 'Smart Watches',
                super_category_id: null,
                category_thumb: 'https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Phones/EN/Smart_Watches.png',
            },

            {
                id: 6,
                name: 'Accessories',
                super_category_id: null,
                category_thumb: 'https://eg.jumia.is/cms/Icons-2023/Categories/Revamp/Phones/EN/Accessories.png',
            },
        ])

        // get categories from api
        // axios.get("https://fakestoreapi.com/products/category/electronics")
        // .then((res) => {
        //     console.log(res.data);
        //     setCartProducts(res.data);
        // }).catch(err => console.log(err));
    }, []);

    return (
        <>
            <Box sx={{ width: '100%', height: '68px', backgroundColor: 'secondary.light', paddingTop: '8px', paddingBottom: '8px' }}>
                <Typography variant='h6' textAlign={'center'} fontWeight={100}>
                    Phones Top Deals
                </Typography>
            </Box>
            <Carousel infinite={true}
                className={classes.carContainer} responsive={responsive}>
                {
                    categories.map((cat) => {
                        return <Category cat={cat} keky={cat.id} />
                    })
                }
            </Carousel>
            <Divider sx={{ height: '22px', width: '100%' }} orientation='horizontal' />
        </>
    )
}
