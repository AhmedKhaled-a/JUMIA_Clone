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
            zIndex : '999'
        },
    },
    paper: {
        transition: '0.3s',
        "&:hover": {
            width : '100%'
        }
    }
});



export default function TopDeals() {
    const classes = useStyles();
    return (
        <>
            <Box sx={{ width:'100%', height: '68px', backgroundColor: 'secondary.light', paddingTop: '8px', paddingBottom: '8px' }}>
                <Typography variant='h6' textAlign={'center'} fontWeight={100}>
                    Phones Top Deals
                </Typography>
            </Box>

            <Grid container alignItems='center' sx={{ padding:8, width: '100%', backgroundColor: 'primary.contrastText' }} columns={12} rowHeight={255}>
                <Grid item sx={{padding: 0}} className={classes.card}  xs={12} md={6}>
                    <Paper sx={{width:'98%'}} className={classes.paper}>
                        <img style={{ width: '100%'}} src={img1} alt="" loading="lazy" />
                    </Paper>
                </Grid>

                <Grid item className={classes.card} xs={12} md={6}>
                <Paper sx={{width:'98%'}} className={classes.paper}>
                    
                    <img style={{ width: '100%'}} src={img2} alt="" loading="lazy" />
                </Paper>
                </Grid>
                <Divider orientation='horizontal' sx={{width:'100%', height:'1.5em'}} />

                <Grid  item className={classes.card} xs={12} md={6}>
                <Paper sx={{width:'98%'}} className={classes.paper}>
                    
                    <img style={{ width: '100%'}} src={img3} alt="" loading="lazy" />
                </Paper>
                </Grid>

                <Grid  item className={classes.card} xs={12} md={6}>
                <Paper sx={{width:'98%'}} className={classes.paper}>
                    
                    <img style={{ width: '100%'}} src={img4} alt="" loading="lazy" />
                </Paper>
                </Grid>
            </Grid>



        </>
    )
}
