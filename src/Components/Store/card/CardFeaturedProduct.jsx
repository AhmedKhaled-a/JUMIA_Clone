import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";

const CardFeaturedProduct = (props) => {
  const products = props.data;
  return (
    <div className="card mb-3">
      <div className="card-header font-weight-bold text-uppercase">
        Featured Products
      </div>
      <div className="card-body">
        {products.map((product, idx) => (
          <div
            className={`row ${idx + 1 === products.length ? "" : "mb-3"}`}
            key={idx}
          >
            <div className="col-md-4">
              <img src={product.image[0]} className="img-fluid" alt="..." />
            </div>
            <div className="col-md-8">
              <h6 className="text-capitalize mb-1">
                <Link
                  to={`/product/detail/${product.nameEn}`}
                  className="text-decoration-none"
                >
                  {product.nameEn}
                </Link>
              </h6>
              <div className="mb-2">
                {Array.from({ length: product.star }, (_, key) => (
                  <IconStarFill className="text-warning mr-1" key={key} />
                ))}
              </div>
              <p className="font-weight-bold h5">
                ${product.price - (product.price * product.discount) / 100}
              </p>
              <del className="small text-muted mr-2">${product.price}</del>
              <span className="rounded p-1 bg-warning  mr-2 small">
                {product.discount}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardFeaturedProduct;
