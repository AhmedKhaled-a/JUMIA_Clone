import { Container } from '@mui/material';
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {  CardActionArea, CardActions } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './styles.css';

const useStyles = makeStyles((theme) => ({
    cardLink: {
        width: `calc((100% / 6) - ${theme.spacing(3)}px)`, // Adjust spacing as needed
        // Add any other styles specific to your card-link class
    },
    card: {
        transition: 'transform 0.2s',
        // Add any other styles specific to your card class
        '&:hover': {
            transform: 'scale(1.03)',
        },
    },
    // Media query styles
    [theme.breakpoints.down('sm')]: {
        cardLink: {
            width: `calc((100% / 3) - ${theme.spacing(3)}px)`, // Adjust spacing as needed
        },
    },
    [theme.breakpoints.down('xs')]: {
        cardLink: {
            width: `calc((100% / 2) - ${theme.spacing(3)}px)`, // Adjust spacing as needed
        },
    },
    [theme.breakpoints.down('xs')]: {
        cardLink: {
            width: `calc(100% - ${theme.spacing(3)}px)`, // Adjust spacing as needed
        },
    },
}));

export default function TopSelling() {
    return (
        <Container className='p-2 mb-3 shadow border-radius'>
            <div className="row">
                <div className='d-flex justify-content-between align-items-center'>
                    <p style={{fontWeight: 'light', fontSize: 22}}>Top selling items</p>
                    <a href="#" className='see-all'>
                        <p style={{color: '#f68b2c'}} className='p-0 m-0'>SEE ALL<ChevronRightIcon /></p>
                    </a>
                </div>

                <div className="cards d-flex justify-content-between align-items-center flex-wrap m-1">
                    <a href="#" className='card-link'>
                        <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                image="https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/48/948715/1.jpg?1326"
                                alt="shoes"
                                className='p-0 m-0'
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    Activ Unisex Leather Lace Up White Sneakers
                                </Typography>
                                <Typography variant="body" color="text.black" >
                                    EGP 669.00
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{textDecoration: 'line-through'}}>
                                    EGP 799.00
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </a>
                    <a href="#" className='card-link'>
                        <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                maxWidth="100%"
                                image="https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/22/287903/1.jpg?9844"
                                alt="shoes"
                                className='p-0 m-0'
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    Kenwood Air Fryer Without Oil, 1800 Watt, 5.5 Liters, Touch Screen, Black - HFP50.000BK
                                </Typography>
                                <Typography variant="body" color="text.black" >
                                    EGP 669.00
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{textDecoration: 'line-through'}}>
                                    EGP 799.00
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </a>
                    <a href="#" className='card-link'>
                        <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                maxWidth="100%"
                                image="https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/15/374804/1.jpg?7600"
                                alt="shoes"
                                className='p-0 m-0'
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                SHARE THIS PRODUCT Official Store Ramadan Offer Samsung 65-Inch CU8000 Crystal UHD- 4K - Smart TV - Dynamic Crystal Colors (2023)
                                </Typography>
                                <Typography variant="body" color="text.black" >
                                    EGP 669.00
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{textDecoration: 'line-through'}}>
                                    EGP 799.00
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </a>
                    <a href="#" className='card-link'>
                        <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                maxWidth="100%"
                                image="https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/52/157032/1.jpg?3329"
                                alt="shoes"
                                className='p-0 m-0'
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    L'Oreal Paris Hyaluron Expert 1.5% Hyaluronic Acid Serum - 30ml
                                </Typography>
                                <Typography variant="body" color="text.black" >
                                    EGP 669.00
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{textDecoration: 'line-through'}}>
                                    EGP 799.00
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </a>
                    <a href="#" className='card-link'>
                        <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                maxWidth="100%"
                                image="https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/20/507943/1.jpg?8676"
                                alt="shoes"
                                className='p-0 m-0'
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    Roomba Fashion Sneakers - Men
                                </Typography>
                                <Typography variant="body" color="text.black" >
                                    EGP 669.00
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{textDecoration: 'line-through'}}>
                                    EGP 799.00
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </a>
                    <a href="#" className='card-link'>
                        <Card sx={{ transition: 'transform 0.2s', '&:hover': { transform: 'scale(1.03)' } }}>
                            <CardActionArea>
                                <CardMedia
                                component="img"
                                maxWidth="100%"
                                image="https://eg.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/54/762534/1.jpg?8696"
                                alt="shoes"
                                className='p-0 m-0'
                                />
                                <CardContent>
                                <Typography gutterBottom variant="h6" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    Samsung Galaxy A14 - 6.6-inch 4GB/64GB Dual Sim 4G - Mobile Phone - Light Green
                                </Typography>
                                <Typography variant="body" color="text.black" >
                                    EGP 669.00
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{textDecoration: 'line-through'}}>
                                    EGP 799.00
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </a>
                </div>
            </div>
        </Container>
    )
}