import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
import { responsive } from '../carouselResponsive';
import Category from './Category/Category'
import axios from 'axios';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    carContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

const Categories = (props) => {
    const classes = useStyles();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Retrieve the query parameter from the URL
                const params = new URLSearchParams(window.location.search);
                const superCategories = props.id;

                // Fetch categories with the query parameter
                const response = await axios.get(`http://localhost:8000/api/categories?id=${superCategories}`);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <>
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
    );
}

export default Categories;
