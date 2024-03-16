import { Container } from '@mui/material'
import React from 'react'

export default function TopSelling() {
    return (
        <Container maxWidth="md">
            <div className="row">
                <div className='d-flex justify-content-between align-items-center'>
                    <h6>Top selling items</h6>
                    <a href="#">SEE ALL </a>
                </div>
            </div>
        </Container>
    )
}
