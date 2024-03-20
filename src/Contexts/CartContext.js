import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../config/config";


export const CartContext = createContext({});

export default function CartContextProvider(props) {


    // TODO: get user id from context
    let user_id = 1;
    const [cartProducts, setCartProducts] = useState([]);


    useEffect(() => {
        // initialize cartdata
        axios.get(`${baseURL}/api/cart/usercart/${user_id}`)
            .then((res) => {
                // console.log(res.data.cart_items);
                setCartProducts(res.data.cart_items);
            }).catch(err => console.log(err));

    }, []);


    return <CartContext.Provider value={{ cartProducts, setCartProducts }}>
        {props.children}
    </CartContext.Provider>


}