import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userDataSelector } from '../../../../userSlice';


export const MainListItems = () => {
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
                    <PeopleIcon />
                </ListItemIcon>

                <ListItemText primary="Products" />

            </ListItemButton>
        </Link>

        <Link to="admins">
            <ListItemButton>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Admins" />
            </ListItemButton>
        </Link>

    </React.Fragment>);

}

// export const secondaryListItems = (
//     <React.Fragment>
//         <ListItemButton>
//             <ListItemIcon>
//                 <LogoutIcon />
//                 <AdminLogout />
//             </ListItemIcon>
//             <ListItemText primary="Logout" />
//         </ListItemButton>
//     </React.Fragment>
// );
