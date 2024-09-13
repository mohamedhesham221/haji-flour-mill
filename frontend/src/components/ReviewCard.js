// A simple component to show a Review.
import "./ReviewCard.css";

import RatingComponent from "./RatingComponent";

// Takes review object as a prop to show on UI.
const ReviewCard = ({ review }) => {
  return (

        <div key={review._id} className="review-card">
          
          <div className="review-details">
            
            <h4>{review.user?.username}</h4>

            <p className="rating"><span>{review.service?.name}</span> - <span><RatingComponent rating={review.rating} /></span></p>

          </div>

          <div className="review-text">
            <p>{review.description}</p>
          </div>

        </div>
  );
};

export default ReviewCard;