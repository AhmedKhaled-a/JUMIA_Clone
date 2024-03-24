import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { baseURL } from "../../config/config";
import { authHeaders } from "../../config/axiosConfig";


let initialState = {
    loading: false,
    loaded: false,
    products: [],
    reviews:null,

}

export const fetchProducts = createAsyncThunk('products/fetchProducts', (url) => {
    let token = localStorage.getItem('userToken');
    return axios.get(
        `${baseURL}/api/${url}`,
        {},
        { headers: authHeaders})
        .then((res) => {
            console.log(res)
            return res.data;

        });
});

export const fetchReviewsByProductId = createAsyncThunk(
    "products/fetchReviewsByProductId",
     (productId, thunkAPI) => {
    
       return axios.get(`${baseURL}/api/reviews/get-by-product?prodId=${productId}`).then(response=> response.data);
       
      }
  );

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductsAction: (state, action) => {
            state.products = action.payload;
        },

        resetReviewsAction: (state) => {
            state.reviews = null;
        }
    },

    // for async fetchUser call
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.loading = true;
        })
        builder.addCase(fetchReviewsByProductId.pending, (state) => {
            state.loading = true;
            state.error = null;
          })

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.loaded = true;
            state.products = action.payload;
            console.log(action.pay);

        })
        .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
          })
          .addCase(fetchReviewsByProductId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          });
    
}



});


export const { setProductsAction, resetReviewsAction } = productsSlice.actions;
export const productsDataSelector = (state) => state.products.products;
export const reviewsDataSelector = (state) => state.products.reviews;
export default productsSlice.reducer;
