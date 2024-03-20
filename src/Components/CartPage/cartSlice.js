import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { userDataSelector } from "../../userSlice";
import axios from "axios";
import { baseURL } from "../../config/config";


let initialState = {
    loading: false,
    cart: [],
    totalItems: 0,
    productsCount: null,
}


export const fetchCartItems = createAsyncThunk('carts/fetchCartItems', (user_id) => {
    let token = localStorage.getItem('userToken');
    return axios.get(`${baseURL}/api/cart/usercart/${user_id}`, {} , { Authorization: `Bearer ${token}` })
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

        // takes cart_item id and value [cart_item_id, value]
        changeCountByValueAction: (state, action) => { // takes array(2) [0 => cid , 1 => val]

            let cartItemIndex = state.cart.findIndex((c) => c.id == action.payload[0]);
            let cartItem = state.cart[cartItemIndex];

            cartItem.count += action.payload[1];

            state.productsCount[cartItem.product.id] += action.payload[1];
            state.totalItems += action.payload[1];
        },

        addOneExistingProductAction: (state, action) => { // takes product_id
            state.cart.find((c) => c.product.id == action.payload).count++; // need testing
            state.productsCount[action.payload]++;
            state.totalItems++;
        },

        deleteCartItemAction: (state, action) => { // takes cartId
            let cartItemIndex = state.cart.findIndex((c) => c.id == action.payload);
            let product_id = state.cart[cartItemIndex].product.id;

            state.totalItems -= state.productsCount[product_id];

            delete state.productsCount[product_id];
            delete state.cart[cartItemIndex];
        },

        clearCartAction: (state) => {
            // reset to initial values
            state.cart = [];
            state.totalItems = 0;
            state.productsCount = null;
        }

    },

    // for async fetchUser call
    extraReducers: builder => {
        builder.addCase(fetchCartItems.pending, state => {
            state.loading = true;
        });

        builder.addCase(fetchCartItems.fulfilled , (state,action) => {
            state.loading = false;
            state.cart = action.payload.cart_items;
            state.totalItems = action.payload.total_items;
            state.productsCount = action.payload.productsCount;
            
        });
    }
});

export const { addItemToCartAction, changeCountByValueAction, addOneExistingProductAction, deleteCartItemAction, clearCartAction, initCartAction } = cartSlice.actions;
export const cartDataSelector = (state) => state.carts.cart;
export default cartSlice.reducer;
