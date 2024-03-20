import { TableCell, TableRow, makeStyles } from '@mui/material';
import React from 'react'

export default function Order(props) {
    let {date, status, product, id } = props.order;
    return (
        <TableRow
            key={product.title}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
            <TableCell component="th" scope="row">
                {product.title}
            </TableCell>
            <TableCell align="left">{id}</TableCell>
            <TableCell align="left">{date}</TableCell>
            <TableCell align="left">
                <span className="status" style={makeStyles(status)}>{status}</span>
            </TableCell>
        </TableRow>
    )
}
