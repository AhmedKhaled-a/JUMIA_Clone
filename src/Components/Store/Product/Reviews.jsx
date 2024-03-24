import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch , useSelector } from "react-redux";
import { fetchReviewsByProductId, reviewsDataSelector } from "../ProductsSlice";
import { CircularProgress, Rating } from '@mui/material';


// const Reviews = ({ reviews }) => {
//   return (
//     <div className="reviews">
//       <h3>Customer Reviews</h3>
//       {reviews.map((review, index) => (
//         <div key={index} className="review">
//           <div className="review-header">
//             <span className="reviewer-name">{review.name}</span>
//             <div className="stars">
//               {[...Array(review.rating)].map((_, i) => (
//                 <FontAwesomeIcon key={i} icon={faStar} className="star-icon" />
//               ))}
//             </div>
//           </div>
//           <p className="review-feedback">{review.feedback}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

function Reviews({productId}) {
  const reviews = useSelector(reviewsDataSelector);   
  const dispatch = useDispatch();
  // if (productReviews.length === 0) {
  //   // return <div>No reviews available for this product</div>;
  // }
  useEffect(() => {
    if(!reviews)
    dispatch(fetchReviewsByProductId(productId));
  
  }, [reviews]);
  // console.log("Product reviews:", product.reviews);

  return (
    <div>
      {reviews?.map((review) => (
        <div key={review.id}>
          <h3>{review.title}</h3>
          <p> By: {review.writer}</p>
          <p><Rating readOnly defaultValue={Math.round(review.rating * 2) / 2} precision={0.5}></Rating></p>
          <p>{review.content}</p>
        </div>
      ))}
    </div>
  );
}
export default Reviews;
