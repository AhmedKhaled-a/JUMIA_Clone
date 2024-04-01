import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookmarkIcon from '@mui/icons-material/Bookmark';

import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
// ----------------- Icons ----------------------
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MailIcon from '@mui/icons-material/Mail';
import ReviewsIcon from '@mui/icons-material/Reviews';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import UpdateIcon from '@mui/icons-material/Update';

const drawerWidth = 240;

function Account(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);
    const navigate = useNavigate();

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    
    const drawer = (
        <div>
        <List>
            {/* --------- My Account --------- */}
        <ListItem disablePadding onClick={() => navigate('/account')}>
                <ListItemButton>
                <ListItemIcon>
            <PersonOutlineIcon sx={{ fontSize: 30}}/>
                </ListItemIcon>
                <ListItemText primary='My Account' />
                </ListItemButton>
            </ListItem>

            {/* --------- Orders --------- */}
            <ListItem disablePadding onClick={() => navigate('/orders/index')}>
                <ListItemButton>
                <ListItemIcon>
                    <StorefrontIcon sx={{ fontSize: 30}}/>
                </ListItemIcon>
                <ListItemText primary='Orders' />
                </ListItemButton>
            </ListItem>

            {/* --------- Inbox --------- */}
            <ListItem disablePadding onClick={() => navigate('/account/inbox')}>
                <ListItemButton>
                <ListItemIcon>
                    <MailIcon sx={{ fontSize: 30}}/>
                </ListItemIcon>
                <ListItemText primary='Inbox' />
                </ListItemButton>
            </ListItem>

            {/* --------- Reviews Index --------- */}
            <ListItem disablePadding onClick={() => navigate('/account/reviews')}>
                <ListItemButton>
                <ListItemIcon>
                    <ReviewsIcon sx={{ fontSize: 30}}/>
                </ListItemIcon>
                <ListItemText primary='Reviews' />
                </ListItemButton>
            </ListItem>
            {/* --------- Saved Items --------- */}
            <ListItem disablePadding onClick={() => navigate('/account/saved')}>
                <ListItemButton>
                <ListItemIcon>
                    <BookmarkIcon sx={{ fontSize: 30}}/>
                </ListItemIcon>
                <ListItemText primary='Saved Items' />
                </ListItemButton>
            </ListItem>

            {/* --------- Followed Sellers --------- */}
            <ListItem disablePadding onClick={() => navigate('/account/followed-sellers')}>
                <ListItemButton>
                <ListItemIcon>
                    <StoreOutlinedIcon sx={{ fontSize: 30}}/>
                </ListItemIcon>
            <ListItemText primary='Followed Sellers' />
                </ListItemButton>
            </ListItem>

            {/* --------- Recently Viewed --------- */}
            <ListItem disablePadding onClick={() => navigate('/account/viewed')}>
                <ListItemButton>
                <ListItemIcon>
                    <UpdateIcon sx={{ fontSize: 30}}/>
                </ListItemIcon>
            <ListItemText primary='Recently Viewed' />
                </ListItemButton>
            </ListItem>
        </List>
        {/* ---------- Divider ---------- */}
        <Divider />
        <List>
            <ListItem disablePadding onClick={() => navigate('')}>
                    <ListItemButton>
                        <ListItemText primary='Account Management' />
                    </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => navigate('/account/address')}>
                    <ListItemButton>
                        <ListItemText primary='Address Book' />
                    </ListItemButton>
            </ListItem>
            <ListItem disablePadding onClick={() => navigate('/account/newsletter')}>
                    <ListItemButton>
                        <ListItemText primary='Newsletter Preferences' />
                    </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <div className="d-flex justify-content-center">
            <Button variant="text" className="mt-2" sx={{ color: '#f68b1e', '&:hover': {backgroundColor: '#fcdbb9'} }}>Logout</Button>
        </div>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container =
        window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: "flex" }}>
        <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                
                },
            }}
            >
            {drawer}
            </Drawer>
            <Drawer
            variant="permanent"
            sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                position: 'unset',
                zIndex: 'unset',
                },
            }}
            open
            >
            {drawer}
            </Drawer>
        </Box>
        </Box>
    );
    }

export default Account;
