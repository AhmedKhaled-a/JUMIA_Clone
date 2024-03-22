import React, { useEffect } from "react";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconCheckCircleFill } from "bootstrap-icons/icons/check-circle-fill.svg";
import ReactStars from "react-rating-stars-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { homeServices } from "../services/_home";

const RatingsReviews = (props) => {
  const [productID, setProductID] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [reviewText, setReviewText] = React.useState("");
  const [createdAt, setCreatedAt] = React.useState(new Date());
  const [reviews, setReviews] = React.useState([]);
  const stars = {
    size: 30,
    value: 0,
    onChange: (newValue) => {
      setProductID(props.productID);
      setUserName(props.user.name);
      setRating(newValue);
    },
  };

  useEffect(() => {
    setProductID(props.productID);
    if (props.productID) {
      homeServices.getProductReview(props.productID).then((data) => {        
        setReviews(data.data);
      });
    }
  }, [setReviews, props.productID]);

  const onSubmit = () => {
    if (productID && userName && rating && reviewText && createdAt) {
      homeServices
        .addReview(productID, userName, rating, reviewText, createdAt)
        .then((data) => {
          console.log(data);
        });
      homeServices.getProductReview(props.productID).then((data) => {
        setReviews(data.data);
      });
    }
  };
  console.log("rating props", props);
  return (
    <div className=" mb-3">
      {props.user && (
        <div className="border-bottom">
          <div className="mb-2">
            <span>
              <ReactStars {...stars} />
            </span>
          </div>
          <form className="my-3">
            <input
              type="text"
              className="form-control"
              placeholder="type your Comment"
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-success my-3"
              onClick={onSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {reviews &&
        reviews.map((review, index) => {
          const newStars = {
            size: 30,
            value: review.rating,
            edit: false,
          };
          return (
            <div key={index} className="border-bottom my-3">
              <span>
                <ReactStars {...newStars} />
              </span>
              <span className="text-muted">
                <IconCheckCircleFill className="text-success mr-1" />
                {review.userName} | Reviewed on{" "}
                <i className="font-weight-bold">{review.createdAt}</i>
              </span>
              <p className="my-3">{review.reviewText}</p>
            </div>
          );
        })}
    </div>
  );
};

// const mapStateToProps = (state) => {
//   return { user: state.productReducer.userInfo };
// };

export default RatingsReviews;
