import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, CircularProgress } from '@mui/material';
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { responsive } from '../carouselResponsive';
import Category from './Category/Category'
import axios from 'axios';
import { makeStyles } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { categoriesDataSelector, fetchCategories } from '../../../categorySlice';

const useStyles = makeStyles({
    carContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

const Categories = (props) => {
    const classes = useStyles();
    const categoriesSl = useSelector(categoriesDataSelector);
    const [categories, setCategories] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if(!categoriesSl.categories) {
            dispatch(fetchCategories(props.id));
        }
    }, []);

    return (
        <>
            { categoriesSl.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> : <>
                <Box sx={{ width: '100%', height: '68px', backgroundColor: 'secondary.light', paddingTop: '8px', paddingBottom: '8px' }}>
                <Typography variant='h6' textAlign={'center'} fontWeight={100}>
                    Phones Top Deals
                </Typography>
            </Box>
            <Divider sx={{ height: '22px', width: '100%' }} orientation='horizontal' />
            <Carousel infinite={true} className={classes.carContainer} responsive={responsive}>
                {categories.map((cat) => (
                    <Category key={cat.id} cat={cat} />
                ))}
            </Carousel>
            </>
            }
        </>
    );
}

export default Categories;
