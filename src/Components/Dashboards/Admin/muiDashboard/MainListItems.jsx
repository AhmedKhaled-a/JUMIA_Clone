import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userDataSelector } from '../../../../userSlice';
import InventoryIcon from '@mui/icons-material/Inventory';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CreateIcon from '@mui/icons-material/Create';

export default function MainListItems() {
    const userData = useSelector(userDataSelector);

    return (<React.Fragment>
        <Link to="">
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>

                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>

        <Link to="orders">
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>

                <ListItemText primary="Orders" />

            </ListItemButton>
        </Link>

        <Link to="products">
            <ListItemButton>
                <ListItemIcon>
                    <InventoryIcon />
                </ListItemIcon>

                <ListItemText primary="Products" />

            </ListItemButton>
        </Link>
        <Link to="admins">
            <ListItemButton>
                <ListItemIcon>
                    <AdminPanelSettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Admins" />
            </ListItemButton>
        </Link>

        <Link to="sellers">
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>

                <ListItemText primary="Sellers" />
            </ListItemButton>
        </Link>

        <Link to="add-product">
            <ListItemButton>
                <ListItemIcon>
                    <CreateIcon />
                </ListItemIcon>

                <ListItemText primary="Add Product" />
            </ListItemButton>
        </Link>

    </React.Fragment>);

}