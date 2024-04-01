import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import React from 'react';
import Badge from '@mui/material/Badge';

export default function RecentProduct(props) {
    let {id, title, price, image,rating } = props.product;
    let discount = '30';
    return (
        <Card sx={{ maxWidth: 500 }}>
        <CardHeader avatar={<Badge badgeContent={`-${discount}%`} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }} color='primary' />}>
        </CardHeader>
        <CardMedia
            component="img"
            height="194"
            image={image}
            alt="Paella dish"
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary" sx={{overflow: 'hidden'
            ,whiteSpace: 'nowrap',width:'100%', textOverflow: 'ellipsis'}}>
                {title}
            </Typography>
            <Typography color='primary' variant="body2" sx={{overflow: 'hidden'
            ,whiteSpace: 'nowrap',width:'100%', textOverflow: 'ellipsis'}}>
                {(price - price * (discount / 100)).toFixed(2)}$
            </Typography>
            <Typography variant="body2" sx={{overflow: 'hidden'
            ,whiteSpace: 'nowrap',width:'100%', textOverflow: 'ellipsis'}}>
                <del>{price}$</del>
            </Typography>
        </CardContent>
        </Card>
    )
}
