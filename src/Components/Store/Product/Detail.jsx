import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import "./Style.module.css";
import CardServices from "../card/CardServices";
import Reviews from "./Reviews"; // Import the Reviews component
import { fetchProducts } from '../ProductsSlice'

import { useDispatch, useSelector } from 'react-redux'
// import { fetchOrders, ordersDataSelector } from '../../ordersSlice';
import { CircularProgress, Rating } from '@mui/material';
import axios from 'axios';
import { addProductToCart, cartDataSelector, changeCountByValueAction } from "../../CartPage/cartSlice";
import { userDataSelector, userSlice } from "../../../userSlice";
import { baseURL, storageURL } from "../../../config/config";




function ProductDetailView(props) {

  const { id } = useParams()

  // const [product, setProduct] = useState(null);
  const [activeImg, setActiveImg] = useState("");
  const userData = useSelector(userDataSelector)
  const dispatch = useDispatch();
  const productsSl = useSelector((state) => state.products);
  const products = productsSl.products;
  const product = products.find((p) => { return (p.id == id) })
  const cart = useSelector(cartDataSelector);
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
  const reviewsData = [
    { name: "John Doe", rating: 4, feedback: "Great product, fast shipping!" },
    { name: "Jane Smith", rating: 5, feedback: "Excellent quality, highly recommend!" },
    // Add more static reviews here as needed
  ];
  useEffect(() => {
    // if (!productsSl.loaded && productsSl.products.length === 0) {
    //   dispatch(fetchProducts("products"));
    // }
  }, []);

  return <>{
    productsSl.loading || cart.loading ? <CircularProgress sx={{ marginLeft: '50%' }} /> : <div className="container-fluid mt-3 productDetail">

      <div className="row bg-gray">
        <div className="col-md-8  bg-white">
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <img
                src={`${storageURL}${product.thumbnail}`}
                className="img-fluid mb-3 product-image"
                alt=""
              />
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={`${storageURL}${img}`}
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
                <div className="stars"><Rating readOnly defaultValue={product.rating}></Rating></div>
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
                  {product.discount * 100} OFF
                </span>
                <p> Shipping fees from EGP 20.00 to 6th of October (free delivery if order above EGP 200.00). Save 10 EGP on shipping with prepaid payment</p>

              </div>
              <div className="mb-3">
                {product.stock ? (
                  <div className="quantity">
                    Out of stock
                  </div>
                ) : (
                  <button
                    type="button"
                    className="button btn btn-warning"
                    onClick={() => addCart(id)}
                    disabled={isInCart(id)}
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                  </button>
                )}
              </div>

              <div className="mb-3">
                <button
                  className="btn btn-sm btn-secondary mr-2"
                  onClick={() => changeInCart(id, -1)} // Minus button
                  disabled={cartProducts.find(c => c.product.id == id).stock <= 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <button
                  className="btn btn-sm btn-secondary ml-2"
                  onClick={() => changeInCart(id, 1)} // Plus button
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
  }</>
}

export default ProductDetailView;
