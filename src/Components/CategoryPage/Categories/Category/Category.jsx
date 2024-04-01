import { Card, CardMedia } from '@mui/material'
import React from 'react'
import { storageURL } from '../../../../config/config'

export default function Category(props) {
  let { category_thumb, name } = props.cat

  return (
      <Card sx={{ maxWidth: 200 }}>
        <CardMedia
          component="img"
          height="184"
          width="184"
          image={`${storageURL}${category_thumb}`}
          alt={name}
        />
      </Card>
  )
}
