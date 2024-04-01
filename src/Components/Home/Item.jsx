import React from 'react'
import { Paper, Button } from '@mui/material'

export default function Item(item) {
    // console.log(item.item.image);
    return (
        <Paper>
            <img src={process.env.PUBLIC_URL + item.item.image } alt="" className='w-100 rounded-1 m-0'/>
        </Paper>
    )
}
