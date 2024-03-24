// Import the necessary dependencies
import React, { useState } from 'react';
import Rating from '@mui/material/Rating';
import axios from 'axios';
import { baseURL } from '../../../config/config';
import { userDataSelector } from '../../../userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { authHeaders } from '../../../config/axiosConfig';
import { fetchReviewsByProductId } from '../ProductsSlice';

// Define the ReviewForm component
function ReviewForm({ productId }) {
  // Define state variables for form fields, loading state, and API error
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [errorList, setErrorList] = useState({});
  const userData = useSelector(userDataSelector);
  const dispatch = useDispatch();


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new review object with form data
    const newReview = {
    
      review:{  title,
        content,
        rating,
        product_id: productId,

    },
    user:userData.user
      
    };

    // Set loading state to true while waiting for the server response
    // setLoading(true);
    
    // Send a POST request to the server with the review data
    
    axios.post(`${baseURL}/api/reviews`, newReview , {headers:authHeaders})
      .then(response => {
        dispatch(fetchReviewsByProductId(productId));
        // Handle success response
        console.log('Review submitted successfully:', response.data);
        setTitle('');
        setContent('');
        setRating(0);
        // Optionally, trigger a callback function to update the UI with the new review
        // onSubmit(response.data);
      })
      .catch(error => {
        // Handle error response
        console.error('Error submitting review:', error);
        
      })
      .finally(() => {
        // Set loading state back to false after the request is completed
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title input field */}
      <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className={`form-control ${errorList.title ? 'is-invalid' : ''}`} id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        {errorList.title && <div className="invalid-feedback">{errorList.title}</div>}
      </div>
      
      {/* Content textarea field */}
      <div className="mb-3">
        <label htmlFor="content" className="form-label">Content</label>
        <textarea className={`form-control ${errorList.content ? 'is-invalid' : ''}`} id="content" rows="3" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        {errorList.content && <div className="invalid-feedback">{errorList.content}</div>}
      </div>
      
      {/* Rating input field */}
      <div className="mb-3">
        <label className="form-label">Rating :</label>
        <Rating
          className='my-2'
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
          precision={0.5}
          required
        />
        {errorList.rating && <div className="invalid-feedback">{errorList.rating}</div>}
      </div>
      
      {/* Submit button */}
      <button type="submit" className="btn btn-warning mb-3" disabled={isLoading}>Submit</button>
      
      {/* Display API error message */}
      {apiError && <div className="text-danger mt-2">{apiError}</div>}
    </form>
  );
}

// Export the ReviewForm component
export default ReviewForm;
