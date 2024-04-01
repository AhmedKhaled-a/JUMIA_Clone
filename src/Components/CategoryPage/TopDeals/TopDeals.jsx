import React from 'react';
import img1 from './img/1.png';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/4.png';

import { Typography, Box, Grid, Paper, Divider } from '@mui/material'
import { makeStyles } from '@mui/styles';


export const useStyles = makeStyles({
    card: {
        transition: '0.3s',
        "&:hover": {
            // height: '500px',
            boxShadow: '4px 4px 4px 4px rgb(0 0 0 / 30%)',
            zIndex: '999'
        },
    },
    paper: {
        transition: '0.3s',
        "&:hover": {
            width: '100%'
        }
    }
});



export default function TopDeals() {
    const classes = useStyles();
    return (
        <>
            <Box sx={{ width: '100%', backgroundColor: '#FFF2D6', paddingTop: '8px', paddingBottom: '8px' }}>
                <Typography variant='h6' textAlign={'center'} fontWeight={100}>
                    Phones Top Deals
                </Typography>
            </Box>

            <div className='top-deals mb-5'>
                <div className='d-flex g-2'>
                    <div className='p-2'><img src={img1} className='w-100 m-0 ' alt=''/></div>
                    <div className='p-2'><img src={img2} className='w-100 m-0' alt=''/></div>
                </div>
                <div className='d-flex g-2'>
                    <div className='p-2'><img src={img3} className='w-100 m-0 ' alt=''/></div>
                    <div className='p-2'><img src={img4} className='w-100 m-0' alt=''/></div>
                </div>
            </div>
            <div className='ad-horizontal mb-5'>
                <a href=""><img src={process.env.PUBLIC_URL + '/images/shop-ad.gif'} className='w-100 m-0' /></a>
            </div>


        </>
    )
}
