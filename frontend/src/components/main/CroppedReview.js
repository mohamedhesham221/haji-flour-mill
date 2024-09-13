// A component to show shorter review example on service card in MainLayout.

import "./CroppedReview.css";
import RatingComponent from "../RatingComponent";
import { Link } from "react-router-dom";

const CroppedReview = ({ reviews, serviceName, serviceId }) => {
  // Find the review of parent component's service.
  const review = reviews?.find(review => review.service?.name === serviceName);

  return (
    <div className="cropped-review-container">
    {/* Add a link to see all reviews of the service. */}
      <h4>Customer Review <Link to={`/reviews/${serviceId}`}>See all</Link></h4>
      <br></br>
      {review && 
        <>
          <div className="review-details">
            <h4>{review.user?.username}</h4>
            <p className="rating"><span>{review.service?.name}</span> - <span><RatingComponent rating={review.rating} /></span></p>
          </div>

        {/* Show only first 150 letters of review as it is short review example. */}
          <div className="review-text">
            <p>{`${review.description.substring(0, 150)}...`}</p>
          </div>
        </>

      }
    </div>
  );
};

export default CroppedReview;