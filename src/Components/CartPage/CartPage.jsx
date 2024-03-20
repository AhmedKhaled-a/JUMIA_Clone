import { Button, Container, Grid } from '@mui/material'
import React, { useState } from 'react'
import Cart from './Cart/Cart'
import CartSummery from './CartSummery/CartSummery'
import RecentlyViewed from './RecentlyViewed/RecentlyViewed'
import useStyles from './styles'

export default function CartPage() {
  const classes = useStyles();
  let [total, setTotal] = useState(0);

  return (
    <>  <Container fixed sx={{ display: 'flex' }} maxWidth="xl" className={classes.container}>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Cart />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CartSummery />
          </Grid>
        </Grid>
    </Container>
      <Container fixed maxWidth="lg" className={classes.container}>
        <RecentlyViewed />
      </Container>
    </>



  )
}
