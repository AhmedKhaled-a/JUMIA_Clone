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
        setCategories([])

        // get categories from api
        // axios.get("https://fakestoreapi.com/products/category/electronics")
        // .then((res) => {
        //     console.log(res.data);
        //     setCategories(res.data);
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
