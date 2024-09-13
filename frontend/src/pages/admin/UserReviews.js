// A page component to show Reviews by a user on AdminLayout.

import "./styles/UserReviews.css";

import ReviewCard from "../../components/ReviewCard";
import UserSearchComponent from "../../components/admin/UserSearchComponent";
import { useState, useRef } from "react";
import { useGetReviewsByUserQuery } from "../../store/APISlice";

const UserReviews = () => {

  // Use useRef to get the value of the input element when submit.
  const usernameRef = useRef();

  // Set local state username with empty string value at first and use it to skip the query run for first render.
  const [username, setUsername] = useState("");

  // Skip the first render as there is no username available for search on first render which is required to send in query search.
  const { data, isError, error, isLoading } = useGetReviewsByUserQuery(username, {
    skip: !username,
  });

  // If any error, print on console.
  isError && console.error(error);

  /**
   * Searches the reviews of username.
   * 
   * @param {Event} e event that triggered the function call
   */
  const handleSubmit = (e) => {
    // Prevent default behaviour of the event fire.
    e.preventDefault();
    // Set the local state value to input element value.
    // It will cause the re-render of the componenet, which will cause the query to fetch user data as skip is no longer set to true.
    setUsername(usernameRef.current.value);
    usernameRef.current.value = ""
  };

  // Get reviews from the data returned by the query.
  const reviews = data?.reviews;

  return (

    <div className="user-reviews-page-container">
      
      <UserSearchComponent
        title={"Search User Reviews"}
        usernameRef={usernameRef}
        isLoading={isLoading}
        buttonText={"Reviews"}
        handleSubmit={handleSubmit} />

      {isLoading && <p>Loading...</p>}
      {error && <p>Error fetching user details</p>}

      <div className="reviews-container-user">
        {username && <h2>All Reviews by {username}</h2>}
        
        {/* If there are reviews, show on UI. If no reviews found by user, show message.*/}
        
        {/* Extra check for existence of reviews object needed in flasy condition because if not checked it will show No Reviews Found! even before fetching the reviews as the main condition would be false in that case. */}

        {reviews?.length > 0 
          ? reviews.map(review => <ReviewCard key={review._id} review={review} />)
          : reviews && <p>No Reviews Found!</p>
        }
      </div>
    </div>
  );
};

export default UserReviews;