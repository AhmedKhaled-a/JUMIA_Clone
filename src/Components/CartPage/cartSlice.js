import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { userDataSelector } from "../../userSlice";
import axios from "axios";
import { baseURL } from "../../config/config";


let initialState = {
    totalItemsLoading : false,
    loading: false,
    cart: [],
    totalItems: null,
    cartTotalPrice : 0,
    productsCount: null,
    error: false,
}

export const addProductToCart = createAsyncThunk('carts/addProductToCart', ([pId, user_id]) => {
    let token = localStorage.getItem('userToken');
    return axios.post(`${baseURL}/api/cart/add/${user_id}`, JSON.stringify({ product_id: pId, count: 1 }),
        { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            return res.data;
        });
});

export const getCartTotal = createAsyncThunk('carts/getCartTotal', (user_id) => {
    let token = localStorage.getItem('userToken');
    return axios.get(`${baseURL}/api/cart/total/${user_id}`, null,
        { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
            return res.data;
        });
});


export const fetchCartItems = createAsyncThunk('carts/fetchCartItems', (user_id) => {
    let token = localStorage.getItem('userToken');

    return axios.get(`${baseURL}/api/cart/usercart/${user_id}`, {}, { 
        Authorization: `Bearer ${token}` , 
        crossDomain: true 
    })
        .then((res) => {
            return res.data;
        }).catch(err => console.log(err));
});


export const cartSlice = createSlice({
    name: 'carts',
    initialState,
    reducers: {

        initCartAction: (state, action) => {
            state = action.payload;
        },
        // you can mutate state here it is okay
        // takes a cart item object
        addItemToCartAction: (state, action) => {
            state.cart.push(action.payload); state.productsCount[action.payload.product.id] = 1; state.totalItems++
        },

        setCartTotalPriceAction: (state, action) => {
            state.cartTotalPrice = action.payload;
        },
        // takes cart_item id and value [cart_item_id, value]
        changeCountByValueAction: (state, action) => { // takes array(2) [0 => cid , 1 => val]

            // get id of cart item
            let cartItem = state.cart.find( (c) => c.id == action.payload[0] );

            cartItem.count += action.payload[1];

            state.productsCount[cartItem.product.id] += action.payload[1];
            state.totalItems += action.payload[1];

            // if (cartItem.count <= 0) {
            //     state.totalItems -= state.productsCount[cartItem.product.id];

            //     delete state.productsCount[cartItem.product.id];
            //     delete state.cartItem;
            // }
        },

        addOneExistingProductAction: (state, action) => { // takes product_id
            state.cart.find((c) => c.product.id == action.payload).count++; // need testing
            state.productsCount[action.payload]++;
            state.totalItems++;
        },

        deleteCartItemAction: (state, action) => { // takes cartId
            let cartItemIndex = state.cart.findIndex( (c) => c?.id == action.payload);
            let product_id = state.cart[cartItemIndex].product.id;

            state.totalItems -= state.productsCount[product_id];

            delete state.productsCount.product_id;
            delete state.cart[cartItemIndex];
        },

        deleteCartItemByProductAction: (state, action) => { // takes productId
            let cartItemIndex = state.cart.findIndex( (c) => c.product.id == action.payload);
            let product_id = action.payload;

            state.totalItems -= state.productsCount.product_id;

            delete state.productsCount.product_id;
            delete state.cart[cartItemIndex];
        },

        clearCartAction: (state) => {
            // reset to initial values
            state.cart = [];
            state.totalItems = 0;
            state.productsCount = {};
        }

    },

    // for async fetchUser call
    extraReducers: builder => {
        builder.addCase(fetchCartItems.pending, state => {
            state.loading = true;
        })

        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.loading = false;
            state.cart = action.payload.cart_items;
            state.totalItems = action.payload.total_items;
            state.productsCount = action.payload.productsCount;

        })

        builder.addCase(fetchCartItems.rejected, (state) => {
            state.loading = false;
            state.error = true;
        })

        builder.addCase(addProductToCart.pending, (state) => {
            //
        })

        builder.addCase(addProductToCart.fulfilled, (state, action) => {
            state.cart.push({ ...action.payload.cart, count: 1, product: action.payload.product });
            state.totalItems += 1;

            state.productsCount[action.payload.product.id] = 1;
        });

        builder.addCase(addProductToCart.rejected, (state) => {
            state.error = true;
        })
        

        builder.addCase(getCartTotal.pending, (state) => {
            state.totalItemsLoading = true;
        })

        

        builder.addCase(getCartTotal.fulfilled, (state, action) => {
            state.totalItemsLoading = false;
            state.totalItems = action.payload.totalItems;
        })
        builder.addCase(getCartTotal.rejected, (state) => {
            state.totalItemsLoading = false;
        })
    }
});

export const { setCartTotalPriceAction, addItemToCartAction, changeCountByValueAction, addOneExistingProductAction, deleteCartItemAction, clearCartAction, initCartAction, deleteCartItemByProductAction } = cartSlice.actions;
export const cartDataSelector = (state) => state.carts;
export default cartSlice.reducer;
