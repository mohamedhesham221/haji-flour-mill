// A page component to show Service's review in AdminLayout.

import ReviewCard from "../../components/ReviewCard";
import { useState } from "react";
import { useGetAllServicesQuery, useGetServiceReviewsQuery } from "../../store/APISlice";

const ServiceReviewsAdmin = () => {

  // Set local state serviceId with empty string value at first and use it to skip the query run for first render.
  const [serviceId, setServiceId] = useState("");

  // Get all the services to select for reviews search.
  const { data, isLoading, isError, error } = useGetAllServicesQuery();

  // Skip the first render as there is no serviceId available for search on first render which is required to send in query search.
  const { data: reviewsData, isLoading: reviewsLoading, isError: reviewsFetchingError, error: reviewsError } = useGetServiceReviewsQuery(serviceId, {
    skip: !serviceId,
  });

  // If loading, show loading message.
  if(isLoading) return <p className="query-loading">Loading...</p>

  // If any error, print on console.
  isError && console.error(error);

  // Get services from the data returned by the query.
  const services = data?.services;
  // Get reviews from the data returned by the query.
  const reviews = reviewsData?.reviews;

  return (

    <div className="service-reviews-page-container-admin">
      
      {error && <p className="query-error">Error fetching services</p>}
      
      <div className="search-input" style={{ marginBottom: "15px" }}>
        <select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          required
        >
          <option value="" disabled>Select Service</option>
          {services?.map(service =>
            <option
              key={service._id}
              value={service._id}
            >
              {service.name}
            </option>
          )}
        </select>
      </div>

      <div className="reviews-container-user">
        {/* Find correct service name from services to display on screen. */}
        {serviceId && <h2>All {services?.find(service => service._id === serviceId).name} Reviews</h2>}

        {reviewsLoading && <p className="query-loading">Loading...</p>}

        {reviewsFetchingError && console.error(reviewsError) && <p className="query-error">Error fetching the Reviews</p>}

        {/* If there are reviews, show on UI. If no reviews found for service, show message.*/}
        
        {/* Extra check for existence of reviews object needed in flasy condition because if not checked it will show No Reviews Found! even before fetching the reviews, as the main condition would be false in that case. */}

        {reviews?.length > 0 
          ? reviews.map(review => <ReviewCard key={review._id} review={review} />)
          : reviews && <p>No Reviews Found!</p>
        }
      </div>
    </div>
  );
};

export default ServiceReviewsAdmin;