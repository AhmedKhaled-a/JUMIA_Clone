import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable() {
    // props => headings, data (following the headings)

    const data = [...props.data]; // {id, title ,.....}
    const headings = [...props.headings]; // {id, title ,.....}
    return (
        <TableContainer component={Paper}>
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
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {
                                headings.map((h,index) => {
                                    return <TableCell component="th" scope="row">
                                        {row.headings[index]}
                                    </TableCell>
                                })
                            }

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}
