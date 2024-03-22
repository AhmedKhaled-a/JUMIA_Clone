import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import {formatTitle} from "../../pipes/formatTitle";
const CardProductGrid = (props) => {
  const product = props.data;
  const [isClicked, setisClicked] = React.useState(false);

  const handeAddToCart = (e) => {
    setisClicked(true);
  };

  useEffect(() => {
    checkCart();
  }, []);

  function checkCart() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      cart.map((prod, index) => {
        if (prod.nameEn === product.nameEn) {
          setisClicked(true);
        } else {
          setisClicked(false);
        }
      });
    }
  }

  return (
    <div className="card">
      <img
        src={product.image}
        className="card-img-top img-fluid"
        style={{ maxHeight: "220px" }}
      />

      <span className="badge bg-success position-absolute mt-2 ml-2">
        {product.brand}
      </span>

      <span className="badge bg-danger position-absolute r-0 mt-2 mr-2">
        {product.discount} %
      </span>

      <div className="card-body">
        <h6 className="card-subtitle mb-2">
          <Link
            to={`/product/detail/${product.nameEn}`}
            className="text-decoration-none"
          >
            {formatTitle(product.nameEn)}
          </Link>
        </h6>
        <div className="my-2">
          <span className="font-weight-bold h5">
            EGP {(product.price - (product.price * product.discount) / 100).toFixed(2)}
          </span>

          <del className="small text-muted ml-2">EGP{product.price}</del>
          
        </div>
        <div className="btn-group btn-block" role="group">
          {!isClicked ? (
            <>
              {" "}
              <button
                type="button"
                className="btn btn-sm btn-primary mr-2 w-100"
                title="Add to cart"
                onClick={() => {
                  props.onAddToCart({
                    nameEn: product.nameEn,
                    price: product.price,
                    discount: product.discount,
                    prodQuantity: product.quantity,
                    image: product.image,
                  });
                  handeAddToCart();
                }}
              >
                <FontAwesomeIcon icon={faCartPlus} /> Add to cart
              </button>{" "}
            </>
          ) : (
            <>
              <button
                type="button"
                disabled
                className="btn btn-sm btn-success mr-2 w-100"
              >
                Item added
              </button>
            </>
          )}
         
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { count: state.productReducer.count };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onPlus: (proName) => dispatch({ type: "PLUS", name: proName }),
    onMinus: (proName) => dispatch({ type: "MINUS", name: proName }),
    onAddToCart: (userProduct) =>
      dispatch({ type: "ADDTOCART", product: userProduct }),
    onLoad: (proName) => dispatch({ type: "LOAD", name: proName }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardProductGrid);
