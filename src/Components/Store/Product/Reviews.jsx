import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviewsByProductId, resetReviewsAction, reviewsDataSelector } from "../ProductsSlice";
import { CircularProgress, Rating } from '@mui/material';

function Reviews({ productId }) {
    const reviews = useSelector(reviewsDataSelector);
    console.log(reviews);
    const dispatch = useDispatch();
    // if (productReviews.length === 0) {
    //   // return <div>No reviews available for this product</div>;
    // }

    // console.log("Product reviews:", product.reviews);
    useEffect(() => {
        if (!reviews)
            dispatch(fetchReviewsByProductId(productId));
        // component did unmount
        return () => {
            dispatch(resetReviewsAction());
        }
    }, []);

    return (    
        <div>
            {reviews?.length > 0 ? <h2>Product Reviews</h2> : ""}
            {reviews?.map((review) => (
                <div key={review.id}>
                    <h3>{review.title}</h3>
                    <p> By:{review.writer}</p>
                    <p><Rating readOnly defaultValue={Math.round(review.rating * 2) / 2} precision={0.5}></Rating></p>
                    <p>{review.content}</p>
                </div>
            ))
            }
        </div>
    );
}
export default Reviews;
