import React from "react";
import Account from "../Components/Account/Account";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Container } from '@mui/material';

const drawerWidth = 240;

export default function RecentlyViewed() {
    return (
        <Container style={{display: 'grid', marginBottom: '50px'}}>
        <Box sx={{ display: "flex" }}>
            <Account />
            <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                width: { sm: `calc(100% - ${drawerWidth}px)` },
                mt: 5,
            }}
            >
            <Toolbar />

            <div>
                <div className="d-flex justify-content-center align-items-center flex-column h-100">
                <img src="https://www.jumia.com.eg/assets_he/images/binoculars.389fc56a.svg" alt="" />
                <h6 className="mt-3">No Recently Viewed Products</h6>
                <p className="mt-2 w-50 text-center">
                You have no recently viewed products at the moment.
                </p>
                <a href="#">
                    <Button
                    variant="contained"
                    sx={{
                        fontSize: 18,
                        backgroundColor: "#f68b1e",
                        "&:hover": { backgroundColor: "#e07e1b" },
                    }}
                    >
                    START SHOPPING
                    </Button>
                </a>
                </div>
            </div>
            </Box>
        </Box>
        </Container>
    );
}
