import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconTruckFill } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
const CardProductList = (props) => {
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
      <div className="row g-0">
        <div className="col-md-3 text-center">
          <img src={product.image} className="img-fluid" alt="..." />
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h6 className="card-subtitle mr-2 d-inline">
              <Link
                to={`/product/detail/${product.nameEn}`}
                className="text-decoration-none"
              >
                {product.nameEn}
              </Link>
            </h6>

            <span className="badge bg-success mr-2">{product.brand}</span>

            {product.isHot && <span className="badge bg-danger mr-2">Hot</span>}

            <p className="small mt-2">{product.description.substr(0, 150)}</p>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <div className="mb-2">
              <span className="font-weight-bold h5">${product.price}</span>
              {product.originPrice > 0 && (
                <del className="small text-muted ml-2">
                  ${product.originPrice}
                </del>
              )}
              {(product.discountPercentage > 0 ||
                product.discountPrice > 0) && (
                <span className={`rounded p-1 bg-warning ml-2 small`}>
                  -
                  {product.discountPercentage > 0
                    ? product.discountPercentage + "%"
                    : "$" + product.discountPrice}
                </span>
              )}
            </div>
            {product.isFreeShipping && (
              <p className="text-success small mb-2">
                <IconTruckFill /> Free shipping
              </p>
            )}
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

export default connect(mapStateToProps, mapDispatchToProps)(CardProductList);
