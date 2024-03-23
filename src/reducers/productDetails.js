const actions = require("../Store/actions");
var count = 0;
const initialState = {
  items: 0,
  userInfo: "",
  searchResult: [],
  term: null,
  count: count,
};
{
  const cart = localStorage.getItem("cart");
  if (cart) {
    const products = JSON.parse(cart);
    initialState.items = products.reduce((sum, item) => {
      return sum + parseInt(item.selectedQuantity);
    }, 0);
  }
}
export const productReducer = (state = initialState, action) => {
  {
  }
  var cart = JSON.parse(localStorage.getItem("cart"));
  if (action.type === "PLUS") {
    const newCart = [...cart];
    newCart.find((product) => {
      if (product.nameEn === action.name) {
        product.selectedQuantity++;
        if (product.selectedQuantity >= product.prodQuantity) {
          product.selectedQuantity = product.prodQuantity;
        }
        count = product.selectedQuantity;
      }
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    var allItems;
    const modifiedCart = localStorage.getItem("cart");

    const products = JSON.parse(modifiedCart);
    allItems = products.reduce((sum, item) => {
      return sum + parseInt(item.selectedQuantity);
    }, 0);
    return (state = { ...state, count: count, items: allItems });
  } else if (action.type === "MINUS") {
    const newCart = [...cart];
    newCart.find((product, index, arr) => {
      if (product.nameEn === action.name) {
        product.selectedQuantity--;
        if (product.selectedQuantity <= 0) {
          arr.splice(index, 1);
          product.selectedQuantity = 0;
        }
        count = product.selectedQuantity;
      }
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    var allItems;
    const modifiedCart = localStorage.getItem("cart");

    const products = JSON.parse(modifiedCart);
    allItems = products.reduce((sum, item) => {
      return sum + parseInt(item.selectedQuantity);
    }, 0);
    return (state = { ...state, count: count, items: allItems });
  } else if (action.type === "ADDTOCART") {
    count = 1;
    const product = { ...action.product, selectedQuantity: count };
    const cartList = [product];
    if (!cart) {
      localStorage.setItem("cart", JSON.stringify(cartList));
    } else {
      const newCart = [...cart];
      newCart.push(product);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    var allItems;
    const modifiedCart = localStorage.getItem("cart");

    const products = JSON.parse(modifiedCart);
    allItems = products.reduce((sum, item) => {
      return sum + parseInt(item.selectedQuantity);
    }, 0);
    return (state = { ...state, count: count, items: allItems });
  } else if (action.type === "LOAD") {
    if (cart) {
      cart.find((product) => {
        if (product.nameEn === action.name) {
          count = product.selectedQuantity;
        } else {
          count = 0;
        }
      });
    }
    return (state = { ...state, count: count });
  }
  switch (action.type) {
    case actions.GET_ITEMS:
      return { ...state, items: (state.items = action.value) };

    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchResult: action.value,
      };
    case "SET_TERM":
      return {
        ...state,
        term: action.value,
      };
    case "USER":
      const userInfo = { ...action.value };

      return { ...state, userInfo: { ...userInfo }, isOnline: true };
    case "GET_ITEMS":
      const cart = localStorage.getItem("cart");
      if (cart) {
        const products = JSON.parse(cart);

        const allItems = products.reduce((sum, item) => {
          return sum + parseInt(item.proQuantity);
        }, 0);
        return { ...state, items: allItems };
      }
  }
  var allItems;
  try {
    const modifiedCart = localStorage.getItem("cart");
    if (modifiedCart) {
      const products = JSON.parse(modifiedCart);
      allItems = products.reduce((sum, item) => {
        return sum + parseInt(item.selectedQuantity);
      }, 0);
    }
  } catch (e) {
    console.log(e);
  }

  return { ...state, items: allItems };
};
