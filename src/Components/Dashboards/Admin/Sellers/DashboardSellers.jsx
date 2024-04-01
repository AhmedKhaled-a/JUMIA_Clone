import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSellers, sellersDataSelector, setSellersAction } from '../sellerSlice';
import BasicTable from '../BasicTable/BasicTable';
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { baseURL } from '../../../../config/config';
import { authHeaders } from '../../../../config/axiosConfig';


export default function DashboardSellers() {
    const sellerData = useSelector(sellersDataSelector);
    const dispatch = useDispatch();

    const deleteSeller = (sellerId) => {
        let sellersCopy = [...sellerData.sellers];
        let sellerIn = sellersCopy.findIndex((seller) => {
            return seller.id == sellerId;
        });

        sellersCopy.splice(sellerIn, 1);

        axios.delete(`${baseURL}/api/sellers/${sellerId}`, { headers: authHeaders });
        dispatch(setSellersAction(sellersCopy));


    }

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
