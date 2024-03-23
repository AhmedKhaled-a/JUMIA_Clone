import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSellers, sellersDataSelector } from '../sellerSlice';
import BasicTable from '../BasicTable/BasicTable';
import { CircularProgress } from '@mui/material';

const deleteSeller = () => {

}
export default function DashboardSellers() {
    const sellerData = useSelector(sellersDataSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        if (sellerData.sellers == null) {
            dispatch(fetchSellers());
        }
    }, []);

    return (
        sellerData.loading ? <CircularProgress sx={{ marginLeft: '50%' }} />
            : <BasicTable
                data={sellerData.sellers}
                headings={['id', 'fullname', 'email', 'shop_name', 'phone_number']}
                delete={deleteSeller}
            />
    )
}
