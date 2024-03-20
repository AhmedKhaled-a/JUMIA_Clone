import { Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material'
import React, {  useState } from 'react'
import { baseURL } from '../../../config/config';
import axios from 'axios';

export default function CartSummery() {
    const {total} = useState(0);
    // TODO: get user_id from context
    let user_id = 1;

    
    return (
        <Container maxWidth='xs' xs={12} md={6}>
            <Card>
            <CardContent >
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                CART SUMMARY
            </Typography>
            <Typography variant="h5" component="div">
                
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Subtotal : {total}
            </Typography>
            
            </CardContent>
            <CardActions>
                
            <Button size="small" variant="contained">Checkout (total)</Button>
            </CardActions>
        </Card>
      </Container>
    )
}
