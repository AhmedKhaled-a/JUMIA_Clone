import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Reviews = ({ reviews }) => {
  return (
    <div className="reviews">
      <h3>Customer Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className="review">
          <div className="review-header">
            <span className="reviewer-name">{review.name}</span>
            <div className="stars">
              {[...Array(review.rating)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />
              ))}
            </div>
          </div>
          <p className="review-feedback">{review.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
