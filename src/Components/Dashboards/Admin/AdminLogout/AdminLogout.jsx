import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser, resetUserData } from '../../../../userSlice';
import axios from 'axios';
import { baseURL } from '../../../../config/config';
import { authHeaders } from '../../../../config/axiosConfig';
import LogoutIcon from '@mui/icons-material/Logout';

export default function AdminLogout() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const logout = () => {
        let usertype = localStorage.getItem('userType');
        axios.post(`${baseURL}/api/auth/${usertype}/logout`, {}, authHeaders)

        localStorage.removeItem('userToken');
        localStorage.removeItem('userType');
        dispatch(resetUserData());
        // fetch one more time
        dispatch(fetchUser());
        navigate('/admin/login');
    }

    return (
        <ListItemButton onClick={logout}>
            <ListItemIcon>
                
                <LogoutIcon />

            </ListItemIcon>
            <ListItemText primary="Logout" />
        </ListItemButton>
    )
}
