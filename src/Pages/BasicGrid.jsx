import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { storageURL } from '../config/config';

export default function BasicGrid(props) {
    return (
        <Grid gap={5} container>
            {
                props.arr?.map( (item) => {
                    return <Grid key={item.id} item sm="12" lg="4">
                        <Card sx={{ height:345,  }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={`${storageURL}${item.thumbnail}`}
                                title={item.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.desc}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                })

            }
        </Grid>
    )
}
