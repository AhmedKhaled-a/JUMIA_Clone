import React from "react";
import Account from "../Components/Account/Account";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { Container } from '@mui/material';
import TopSelling from "../Components/Account/TopSelling";

const drawerWidth = 240;

export default function AddressBook() {
    return (
        <>
        <Container style={{display: 'flex', marginBottom: '50px'}}>
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
            {/* <Toolbar /> */}

            <div>
                <div className="d-flex justify-content-center align-items-center flex-column h-100">
                <img src="https://www.jumia.com.eg/assets_he/images/notebook.0c73f0bb.svg" alt="" />
                <h6 className="mt-3">You have not added any address yet!</h6>
                <p className="mt-2 w-50 text-center">
                Add your shipping addresses here for a fast purchase experience! You will be able to add, modify or delete them at any time.
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
                    ADD NEW ADDRESS
                    </Button>
                </a>
                </div>
            </div>
            </Box>
        </Box>
        </Container>
        <TopSelling />
        </>
    );
}
