import React from 'react';
import Carousel from 'react-material-ui-carousel'
import Item from './Item';
// import { Paper, Button } from '@mui/material'


function ItemCarousel()
{
    let items = [
        {
            id:1,
            image:'/images/ad1.png',
        },
        {
            id:2,
            image:'/images/ad2.jpg',
        },
        {
            id:3,
            image:'/images/ad3.png',
        },
        {
            id:4,
            image:'/images/ad4.png',
        },
        {
            id:5,
            image:'/images/ad5.gif',
        },
        {
            id:6,
            image:'/images/ad6.png',
        },
    ]
    return (
        <Carousel indicators={false}>
            {
                items.map( item => <Item key={item.id} item={item} /> )
            }
        </Carousel>
    )
}

export default ItemCarousel