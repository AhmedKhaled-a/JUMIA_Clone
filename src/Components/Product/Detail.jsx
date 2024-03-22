import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import image1 from './imgs/star_yellow.png'
import "./Style.css";
import CardFeaturedProduct from "../card/CardFeaturedProduct";
import CardServices from "../card/CardServices";
import Reviews from "./Reviews"; // Import the Reviews component


function ProductDetailView(props) {
  const [product, setProduct] = useState({});
  const [image, setImage] = useState([]);
  const [activeImg, setActiveImg] = useState("");
  const { productId } = useParams();
  const reviewsData = [
    { name: "John Doe", rating: 4, feedback: "Great product, fast shipping!" },
    { name: "Jane Smith", rating: 5, feedback: "Excellent quality, highly recommend!" },
    // Add more static reviews here as needed
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulating API response with static data
        const staticData = {
          id: 1,
          nameEn: "Product Name",
          price: 100,
          discount: 10,
          quantity: 5,
          description: "Product Description",
          image: [{image1}],
        };

        setActiveImg(staticData.image[0]);
        setImage(staticData.image);
        setProduct(staticData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container-fluid mt-3 productDetail">
      <div className="row bg-gray">
        <div className="col-md-8  bg-white">
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <img
                src={activeImg}
                className="img-fluid mb-3 product-image"
                alt=""
              />
              {image.map((img, index) => (
                <img
                  key={index}
                  src={image1}
                  className={`border product-thumbnail ${activeImg === img ? 'active' : ''}`}
                  width="75"
                  onClick={() => setActiveImg(img)}
                  alt={`Thumbnail ${index}`}
                />
              ))}
            </div>
            <div className="col-md-7">
              <h1 className="product-name">{product.nameEn}</h1>
              <div className="d-flex align-items-center mb-3">
                <div className="stars">★★★★☆</div>
                <span className="ml-2">(4)</span>
              </div>

              <div className="price mb-3">
                <span className="discounted-price">
                  EGP{product.price - (product.price * product.discount) / 100}
                </span>
                <del className="original-price ml-2">
                  EGP{product.price}
                </del>
                <span className="discount-badge ml-2">
                  {product.discount}% OFF
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
                    // onClick={() =>
                    //   props.onAddToCart({
                    //     nameEn: product.nameEn,
                    //     price: product.price,
                    //     discount: product.discount,
                    //     prodQuantity: product.quantity,
                    //     image: activeImg,
                    //   })
                    // }
                  >
                    <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                  </button>
                )}
              </div>

              <div className="mb-3">
                <button 
                  type="button"
                  className="tab-button btn btn-warning"
                  data-toggle="tab"
                  href="#nav-details"
                  role="tab"
                  aria-controls="nav-details"
                  aria-selected="true"
                >
                  Product Description
                </button>
                <button
                  type="button"
                  className="tab-button btn btn-warning ms-3"
                  data-toggle="tab"
                  href="#nav-ship-returns"
                  role="tab"
                  aria-controls="nav-ship-returns"
                  aria-selected="false"
                >
                  Shipping & Returns
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
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed autem quidem ad eaque harum dicta ex eos pariatur voluptatum qui atque corrupti labore distinctio velit ducimus quia dolore, quis natus. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem possimus cupiditat aperiam inventore iste esse harum aliquam culpa molestias, voluptatem totam officia amet magni adipisci!</p>
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
      {/* Reviews section */}
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
