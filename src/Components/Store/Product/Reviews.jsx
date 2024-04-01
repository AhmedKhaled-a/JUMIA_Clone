import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsByProductId, resetReviewsAction, reviewsDataSelector } from "../ProductsSlice";
import { CircularProgress, Rating } from '@mui/material';


function Reviews({ productId }) {
  const reviews = useSelector(reviewsDataSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reviews)
      dispatch(fetchReviewsByProductId(productId));
    // component did unmount
    return () => {
      dispatch(resetReviewsAction());
    }
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
  };

  return (
    <div>
      {
      reviews?.map((review) => (
        <div className="d-flex justify-content-start align-items-start bg-light p-4 rounded mb-5">
          <div className="bg-light p-3 rounded mb-4 col-8">
            <div key={review.id} className="border-bottom mt-2">
              <p><Rating readOnly defaultValue={Math.round(review.rating * 2) / 2} precision={0.5}></Rating></p>
              <h3>{review.title}</h3>
              <p>{review.content}</p>
              <p className="text-muted" style={{ fontSize: "14px" }}>{formatDate(review.created_at)} by {review.writer}</p>
            </div>
          </div>
        </div>
      ))
      }
    </div>
  );
}
export default Reviews
