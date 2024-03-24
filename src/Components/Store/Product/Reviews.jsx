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
      {reviews?.length > 0 ? <h2>Product Reviews</h2> : ""}
      {reviews?.map((review) => (

        // <div key={review.id}>
        //   <h3>{review.title}</h3>
        //   <p> By:{review.writer}</p>
        //   <p><Rating readOnly defaultValue={Math.round(review.rating * 2) / 2} precision={0.5}></Rating></p>
        //   <p>{review.content}</p>
        // </div>
        <div className="d-flex justify-content-start align-items-start bg-light p-4 rounded mb-5">
          <div style={{ width: "170px", height: "170px" }} className="rounded bg-light shadow col-4 border me-4 d-flex flex-column justify-content-start align-items-center p-3">

            {/* <p style={{ color: "#f68b2c", fontSize: "30px" }} className="text-center">{averageRating.toFixed(1)}/5</p>
          <p className="py-0 my-0"><Rating readOnly defaultValue={averageRating.toFixed(1)} precision={0.5}></Rating></p> */}

            <p className="mt-2">{reviews?.length} Reviews</p>
          </div>
          <div className="bg-light p-3 rounded mb-4 col-8">
            {reviews?.map((review) => (
              <div key={review.id} className="border-bottom mt-2">
                <p><Rating readOnly defaultValue={Math.round(review.rating * 2) / 2} precision={0.5}></Rating></p>
                <h3>{review.title}</h3>
                <p>{review.content}</p>
                <p className="text-muted" style={{ fontSize: "14px" }}>{formatDate(review.created_at)} by {review.writer}</p>
              </div>
            ))}
          </div>
        </div>
      ))
      }
    </div>
  );
}

export default Reviews
