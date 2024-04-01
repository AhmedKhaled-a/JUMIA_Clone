// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { CircularProgress, Typography } from '@mui/material';
// // import axios from 'axios';
// import { productsDataSelector } from '../ProductsSlice';

// export default function DashboardProducts() {
//     const dispatch = useDispatch();
//     const productsSl = useSelector((state) => state.products);
//     const products = useSelector(productsDataSelector);

//     // let deleteProduct = (pId) => {
//     //     let productsCopy = [...products];
//     //     let productInd = productsCopy.findIndex((product) => {
//     //         return product.id == pId;
//     //     });

//         // productsCopy.splice(productInd, 1);

//         // axios.delete(`${baseURL}/api/products/delete-product/${pId}`, {headers: authHeaders});
//         // dispatch(setProductsAction(productsCocy));
        

//     // }

//     // navigate to update form


//     useEffect(() => {
//         if (products.length == 0)
//             dispatch(fetchProducts("products"));
//     }, [])

//     return (
//         <>
//             <Typography variant='h2' paragraph>
//                 Products
//             </Typography>
            
//                 productsSl.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> :
                  
                       
//         </>
//     )
// }
