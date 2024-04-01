import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress, IconButton } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';

export default function BasicTable(props) {

    const headings = [...props.headings];

    return (
        <>
            {
                props.data == null ? <CircularProgress sx={{ marginLeft: '50%' }} /> : <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    headings.map((h, index) => {
                                        return <TableCell key={index}>{h}</TableCell>
                                    })
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data.map((row, index) => {
                                return <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {
                                        headings.map((h, index) => {
                                            var arr = h.split(".");
                                            var obj = row;
                                            while (arr.length && (obj = obj[arr.shift()]));
                                            return <TableCell component="th" scope="row" key={index}>
                                                {obj}
                                            </TableCell>
                                        })
                                    }
                                    <TableCell component="th" scope="row" >
                                        <IconButton color='error' onClick={ () => { props.delete(row.id) }}><DeleteIcon /></IconButton>
                                        {/* <IconButton color='primary'><UpdateIcon /></IconButton> */}
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>

    )
}
