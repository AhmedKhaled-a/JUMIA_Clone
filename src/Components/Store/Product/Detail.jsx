import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import image1 from './imgs/star_yellow.png'
import "./Style.module.css";
import CardFeaturedProduct from "../card/CardFeaturedProduct";
import CardServices from "../card/CardServices";
import Reviews from "./Reviews"; // Import the Reviews component
import { fetchProducts, productsDataSelector, setProductsAction } from '../Store/ProductsSlice';
import { authHeaders } from '../../config/axiosConfig';
import { baseURL } from '../../config/config';
import { useDispatch, useSelector } from 'react-redux'
// import { fetchOrders, ordersDataSelector } from '../../ordersSlice';
import { CircularProgress, Rating, Typography } from '@mui/material';
import axios from 'axios';
import { addProductToCart, cartDataSelector, changeCountByValueAction } from "../CartPage/cartSlice";
import { userDataSelector, userSlice } from "../../userSlice";




function ProductDetailView(props) {
  const [image, setImage] = useState([]);
  const [activeImg, setActiveImg] = useState("");
  const userData= useSelector(userDataSelector)
  const dispatch = useDispatch();
  const productsSl = useSelector((state) => state.products);
  const products = useSelector(productsDataSelector);
  const product=products?.find((p)=>p.id==props.id) ;
  const cart = useSelector(cartDataSelector);
  const cartCount = cart.totalItems;
  const cartProducts = cart.cart;

  const addCart = (pId) => {
    dispatch(addProductToCart([pId, userData.user.id]))
}

const isInCart = (pId) => {
    // console.log(cartProducts);
    if (cartProducts?.length > 0) {
        if (cartProducts.find((c) => c.product.id == pId)) {
            return true
     }
        return false
    }
}

// change count in cart
const changeInCart = (pId, n) => {
    let cartItem = cartProducts.find((c) => c.product.id == pId);

    let count = cartItem.count;
    let newCount = count + n;
    dispatch(changeCountByValueAction([cartItem.id, n]))

    axios.put(`${baseURL}/api/cart/${cartItem.id}/update-count`, JSON.stringify({
        count: newCount
    }, { Authorization: `Bearer ${userData.token}` })).then(res => console.log(res));
}
  const  productId  = props.id;
  const reviewsData = [
    { name: "John Doe", rating: 4, feedback: "Great product, fast shipping!" },
    { name: "Jane Smith", rating: 5, feedback: "Excellent quality, highly recommend!" },
    // Add more static reviews here as needed
  ];
  useEffect(() => {
    if (products.length == 0)
        dispatch(fetchProducts("products"));
}, [])

  return (
    <div className="container-fluid mt-3 productDetail">
      <div className="row bg-gray">
        <div className="col-md-8  bg-white">
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <img
                src={product.thumbnail}
                className="img-fluid mb-3 product-image"
                alt=""
              />
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className={`border product-thumbnail ${activeImg === img ? 'active' : ''}`}
                  width="75"
                  onClick={() => setActiveImg(img)}
                  alt={`Thumbnail ${index}`}
                />
              ))}
            </div>
            <div className="col-md-7">
              <h1 className="product-name">{product.title}</h1>
              <div className="d-flex align-items-center mb-3">
                <div className="stars"><Rating readOnly value={product.rating}></Rating></div>
                <span className="ml-2">(4)</span>
              </div>

              <div className="price mb-3">
                <span className="discounted-price">
                  EGP{product.price - (product.price * product.discount)}
                </span>
                <del className="original-price ml-2">
                  EGP{product.price}
                </del>
                <span className="discount-badge ml-2">
                  {product.discount*100} OFF
                </span>
                <p> Shipping fees from EGP 20.00 to 6th of October (free delivery if order above EGP 200.00). Save 10 EGP on shipping with prepaid payment</p>

              </div>
              <div className="mb-3">
                {props.count ? (
                  <div className="quantity">
                
    
                  
                  </div>
                ) : (
                  <button
                    type="button"
                    className="button btn btn-warning"
                    onClick={() => addCart(productId)}
                    disabled={isInCart(productId)} 
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                  </button>
                )}
              </div>

              <div className="mb-3">
              <button
                  className="btn btn-sm btn-secondary mr-2"
                  onClick={() => changeInCart(productId, -1)} // Minus button
                  disabled={cartProducts.find(c=>c.product.id==productId).count <= 1} 
                     >
                   <FontAwesomeIcon icon={faMinus} />
              </button>
              <button
                  className="btn btn-sm btn-secondary ml-2"
                  onClick={() => changeInCart(productId, 1)} // Plus button
                           >
                      <FontAwesomeIcon icon={faPlus} />
                      </button>       
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
            <CardServices />
        </div>
      </div>
      <div className="productDetail mt-2 bg-white">
            <h4>Product Details:</h4>
            <hr className="mb-2" />
            <p>{product.desc}</p>
          </div>
   <div className="container-fluid mt-3 productDetail">
      <div className="row">
        <div className="col-md-8">
          {/* Existing product details and description */}
        </div>
        <div className="col-md-4">
          {/* Existing CardServices component */}
        </div>
      </div>
      Reviews section
      <div className="row">
        <div className="col">
          <Reviews reviews={reviewsData} />
        </div>
      </div>
    </div>
    </div>
  );
}

export default ProductDetailView;
