
export const GET_ITEMS='GET_ITEMS'
export const SET_USER_CART='SET_USER_CART'

export function setItems(items){
    return{
        type:GET_ITEMS,
        value:items
    }
}
export function setUserCart(cart){
    return{
        type:SET_USER_CART,
        value:cart
    }
}