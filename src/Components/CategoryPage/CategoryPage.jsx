import React from 'react'
import PriceRangedProducts from './PriceRangedProducts/PriceRangedProducts'
import { Box, Container, Divider, Typography } from '@mui/material'
import { useTheme } from '@emotion/react'
import TopDeals from './TopDeals/TopDeals';
import Categories from './Categories/Categories';
// import Categories from './Categories/Categories';

export default function CategoryPage(props) {
    return (
        <Container maxWidth='lg'>
            <PriceRangedProducts />
            <TopDeals />
            <Categories id={props.id}/>
        </Container>
    )
}
