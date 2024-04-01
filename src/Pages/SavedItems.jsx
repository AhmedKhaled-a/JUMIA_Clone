import React, { useEffect } from "react";
import Account from "../Components/Account/Account";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { Button, CircularProgress } from "@mui/material";
import { Container } from '@mui/material';
import TopSelling from "../Components/Account/TopSelling";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedProducts, savedProductsDataSelector } from "../Components/Store/savedProductsSlice";
import { userDataSelector } from "../userSlice";
import BasicGrid from "./BasicGrid";

const drawerWidth = 240;

export default function SavedItems() {
    const saved = useSelector(savedProductsDataSelector);
    const savedProducts = saved.savedProducts;
    const dispatch = useDispatch();
    const userData = useSelector(userDataSelector);

    useEffect(() => {
        if (!savedProducts) {
            dispatch(fetchSavedProducts(userData.user.id));
        }
    }, []);
    return (
        <>
            { userData.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> : <Container style={{ display: 'flex', marginBottom: '50px' }}>
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
                            {
                                (savedProducts?.length != 0 && savedProducts && saved.loading == false) ? <BasicGrid arr={savedProducts} /> : <div className="d-flex justify-content-center w-100 align-items-center flex-column h-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        width="100"
                                        height="100">
                                        <defs>
                                            <path
                                                id="a"
                                                d="M99.962 49.908c0 27.564-22.378 49.908-49.981 49.908C22.377 99.816 0 77.472 0 49.908S22.377 0 49.98 0c27.604 0 49.982 22.344 49.982 49.908"
                                            />
                                        </defs>
                                        <g fill="none" fillRule="evenodd">
                                            <mask id="b" fill="white">
                                                <use xlinkHref="#a" />
                                            </mask>
                                            <use fill="#F5F5F5" xlinkHref="#a" />
                                            <g fillRule="nonzero" mask="url(#b)">
                                                <path
                                                    fill="#F68B1E"
                                                    d="M61.496 29A12.01 12.01 0 0 0 51 35.127v35.83c3.38-2.511 22.5-17.287 22.5-30.082C73.5 34.317 68.125 29 61.496 29z"
                                                />
                                                <path
                                                    fill="#FFB048"
                                                    d="M40.004 29C33.374 29 28 34.317 28 40.875c0 12.794 19.12 27.57 22.5 30.082v-35.83A12.011 12.011 0 0 0 40.004 29z"
                                                />
                                            </g>
                                        </g>
                                    </svg>
                                    <h6 className="mt-3">You haven’t saved an item yet!</h6>
                                    <p className="mt-2 w-50 text-center">
                                        Found something you like? Tap on the heart shaped icon next to the item to add it to your wishlist! All your saved items will appear here.
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
                                            CONTINUE SHOPPING
                                        </Button>
                                    </a>
                                </div>
                            }

                        </div>
                    </Box>
                </Box>
            </Container>}
            <TopSelling />
        </>
    );
}
