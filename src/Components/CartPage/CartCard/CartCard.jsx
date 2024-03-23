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
        <Card sx={{ display: 'flex', height: '220px', width:'100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>
                <CardMedia
                    component="img"
                    sx={{ width: '75px', height: '75px' }}
                    image={`${storageURL}/${thumbnail}`}
                    alt="Live from space album cover"
                />
                <CardContent sx={{ flex: '1 0 auto', width: '64%' }}>
                    <Grid container columns={12} columnSpacing={8} direction={'row'} spacing={2}>
                        <Grid item xs={9}>
                            <Typography component="p" variant="p" paragraph>
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Grid container direction="column">
                                <Grid item xs={6}>
                                    <Typography color={'primary'} variant='h5' paragraph>
                                        {(price - price * (discount / 100)).toFixed(2)}$
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant='h6' paragraph>
                                        <del>{(price).toFixed(2)}$</del>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container sx={{ width: '100%' }} columns={12} columnSpacing={8} direction={'row'} spacing={2}>
                        <Grid item xs={6}>
                            <IconButton onClick={() => { props.deleteProduct(props.cartId) }}>
                                <DeleteIcon color='primary' />
                            </IconButton>
                        </Grid>

                        <Grid item xs={6}>
                            <ButtonGroup
                                disableElevation
                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                variant='contained'
                            >
                                
                                <CartButton onClick={() => {if(props.count - 1) props.changeCount(props.cartId, -1)}}><RemoveIcon /></CartButton>

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
        </Card>

    );
}
