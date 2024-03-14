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
            <Box sx={{ height: '48px', backgroundColor: 'secondary.light', padding: '8px' }}>
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
            <Carousel responsive={responsive}>
                <Paper sx={{padding:'2px'}} className={classes.card}>

                    <img src={img2} alt="" loading="lazy" />
                </Paper>

                <Paper className={classes.card}>

                    <img src={img3} alt="" loading="lazy" />
                </Paper>


                <Paper className={classes.card}>
                    <img src={img4} alt="" loading="lazy" />
                </Paper>

                <Paper className={classes.card}>
                    <img src={img5} alt="" loading="lazy" />
                </Paper>

                <Paper className={classes.card}>
                    <img src={img6} alt="" loading="lazy" />
                </Paper>
            </Carousel>
            {/* </ImageList> */}
        </>
    )
}
