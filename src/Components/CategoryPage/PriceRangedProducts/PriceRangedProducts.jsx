import React from 'react';
import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';
import img5 from './img/5.png';
import img6 from './img/6.png';
import { Paper, Typography, Box, ImageList, ImageListItem, useMediaQuery, Card, CardMedia } from '@mui/material'
import { theme } from '../../../theme';
import { shadows } from '@mui/system';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { hoverStyles } from '../hoverStyles';
import { responsive } from '../carouselResponsive';



export default function PriceRangedProducts() {
    const classes = hoverStyles();
    const matchDownLg = useMediaQuery(theme.breakpoints.down('md'));



    return (
        <>
            <Box sx={{backgroundColor: '#FFF2D6', padding: '8px' }}>
                <Typography variant='h6' textAlign={'center'} fontWeight={100}>
                    From Budget-Friendly to Premium Picks!
                </Typography>
            </Box>
            {/* <ImageList sx={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', width: '100%', paddingBottom:4, paddingTop: 4, backgroundColor: 'primary.contrastText' }} cols={matchDownLg ? 2 : 6}> */}
            {/* <ImageListItem>
                    <Paper elevation={0}>
                        <img src={img1} alt="" loading="lazy" />
                    </Paper>
                </ImageListItem> */}
            <Carousel responsive={responsive} className='mb-5 pb-1 bg-white rounded-bottom'>
                <img className='m-0 ad-card' src={img2} alt="" />
                <img className='m-0 ad-card' src={img3} alt="" />
                <img className='m-0 ad-card' src={img4} alt="" />
                <img className='m-0 ad-card' src={img5} alt="" />
                <img className='m-0 ad-card' src={img6} alt="" />
                <img className='m-0 ad-card' src={img3} alt="" />
            </Carousel>
            {/* </ImageList> */}
        </>
    )
}
