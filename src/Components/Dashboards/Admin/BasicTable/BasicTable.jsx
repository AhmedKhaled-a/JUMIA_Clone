import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { CircularProgress } from '@mui/material';

export default function BasicTable(props) {
    // props => headings, data (following the headings)

    // const data = [...props.data]; // {id, title ,.....}
    const headings = [...props.headings]; // {id, title ,.....}

    return (
        <>
            {
                props.data == null ? <CircularProgress sx={{ marginLeft: '50%' }} /> : <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {
                                    headings.map((h) => {
                                        return <TableCell>{h}</TableCell>
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

                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </>

    )
}
