import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup, Grid, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Divider from '@mui/material/Divider';
import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import { storageURL } from '../../../config/config';


export default function CartCard(props) {
    //   const theme = useTheme();
    let CartButton = styled(Button)(({ theme }) => ({
        padding: '4px',
        width: '24px',
        height: '24px',
        variant: 'contained',
    }))

    let { id, title, price, thumbnail, discount } = props.product;

    return (
        <>
        <div className='row bg-light rounded mb-1 pt-2'>
            <div className="lft col-8 p-3">
                <div className="small-card d-flex justify-content-start align-items-start ps-3">
                    <img src={`${storageURL}/${thumbnail}`} alt={title} className='rounded me-3' style={{width: '120px', height: '120px', objectFit: 'cover'}}/>
                    <h5 className='pt-1'>{title}</h5>
                </div>
                <IconButton onClick={() => { props.deleteProduct(props.cartId) }} sx={{ '&:hover': {backgroundColor: '#ebb98669', borderRadius: '4px'}, marginTop: '4px', }} className='ps-3'>
                    <DeleteIcon color='primary' /> <span className='fs-6' style={{color: '#f68b1e'}}>Remove</span>
                </IconButton>
            </div>

            <div className="rght col-4 text-end p-3">
                <h5 className='fs-4'>{(price - price * (discount / 100)).toFixed(2)}$</h5>

                <div className='d-flex justify-content-end align-items-center'>
                    <h5 className='text-muted text-decoration-line-through me-1'>{(price).toFixed(2)}$</h5>
                    <small className=' badge text-center ms-1' style={{ backgroundColor: '#ebb98669', color: '#f68b1ecc', fontSize: '14px' }}>-{(discount).toFixed()}%</small>
                </div>

                <ButtonGroup
                    disableElevation
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}
                    variant='contained'
                >
                    
                    <CartButton onClick={() => {if(props.count - 1 > 0 ) props.changeCount(props.cartId, -1)}} className='shadow'><RemoveIcon /></CartButton>

                    <Typography sx={{ padding: '8px' }} component="div" variant="h6">
                        {props.count}
                    </Typography>

                    <CartButton onClick={() => props.changeCount(props.cartId, 1)} className='shadow' ><AddIcon /></CartButton>

                </ButtonGroup>
            </div>
        </div>

        {/* <Card sx={{ display: 'flex', height: '220px', width:'100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }} className='justify-content-evenly align-items-stretch col-12 p-3'>
                <div className='col-6 d-flex justify-content-evenly align-items-start'>
                    <CardMedia
                        component="img"
                        sx={{ width: '120px', height: '120px' }}
                        image={`${storageURL}/${thumbnail}`}
                        alt="Live from space album cover"
                        className='rounded'
                    />
                    <p>{title}</p>
                </div>
                <CardContent className='col-6'>
                    <Grid container columns={12} columnSpacing={8} direction={'row'} spacing={2}>
                        <Grid item xs={9}>
                            <Typography component="p" variant="p" paragraph>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container direction="column">
                                <Grid item xs={6}>
                                    <Typography color={'black'} variant='h5' paragraph className='w-100'>
                                        EGP {(price - price * (discount / 100)).toFixed(2)}$
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='h6' paragraph className='d-flex justify-content-center align-items-center'>
                                        <del className='text-muted'>{(price).toFixed(2)}$</del>
                                        <small className=' badge text-center ms-2' style={{ backgroundColor: '#ebb98669', color: '#f68b1ecc' }}>-{(discount).toFixed()}%</small>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ width: '100%' }} columns={12} columnSpacing={8} direction={'row'} spacing={2}>
                        <Grid item xs={6}>
                            <IconButton onClick={() => { props.deleteProduct(props.cartId) }} sx={{ '&:hover': {backgroundColor: '#ebb98669', borderRadius: '4px'}, marginTop: '4px', }}>
                                <DeleteIcon color='primary' /> <span className='fs-6' style={{color: '#f68b1e'}}>Remove</span>
                            </IconButton>
                        </Grid>

                        <Grid item xs={6}>
                            <ButtonGroup
                                disableElevation
                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                variant='contained'
                            >
                                
                                <CartButton onClick={() => {if(props.count - 1 > 0 ) props.changeCount(props.cartId, -1)}}><RemoveIcon /></CartButton>

                                <Typography sx={{ padding: '8px' }} component="div" variant="h6">
                                    {props.count}
                                </Typography>

                                <CartButton onClick={() => props.changeCount(props.cartId, 1)} ><AddIcon /></CartButton>

                            </ButtonGroup>
                        </Grid>
                    </Grid>


                </CardContent>
            </Box>
            <Divider orientation='horizontal' flexItem />
        </Card> */}
        </>
    );
}
