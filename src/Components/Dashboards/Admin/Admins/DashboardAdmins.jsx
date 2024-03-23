import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { adminsDataSelector, fetchAdmins } from '../adminSlice'
import BasicTable from '../BasicTable/BasicTable';
import { CircularProgress, Typography } from '@mui/material';

export default function DashboardAdmins() {
    const admins = useSelector(adminsDataSelector);
    const dispatch = useDispatch();

    let deleteAdmin = (adminId) => {

    }

    useEffect(() => {
        if(admins.admins == null)
            dispatch(fetchAdmins());

    }, []);

    return <>
        <Typography variant='h2' paragraph>
            Admins
        </Typography>
        {
            admins.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> : <BasicTable
                data={admins.admins}
                headings={['id', 'email', 'created_at']}
                delete={deleteAdmin}
            />
        }
    </>
}
