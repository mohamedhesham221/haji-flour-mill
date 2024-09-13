// A page component to show all services.
import "./styles/Services.css";

import { useGetAllServicesQuery, useGetAllReviewsQuery } from "../../store/APISlice.js";
import CroppedReview from "../../components/main/CroppedReview.js";

const Services = () => {
  // Use GetAllServices Query to get all the services.
  const { data, isLoading, isError, error } = useGetAllServicesQuery();

  // Use GetAllReviews Query to get all the services.
  const { data: reviewsData } = useGetAllReviewsQuery();

  // Show loading message on query loading.
  if (isLoading) return <p className="query-loading">Loading...</p>;

  // Show error message on query error.
  if (isError) {
    console.error(error);
    return <p className="query-error">An error has occured!</p>;
  };

  // Get services from the data returned by the query.
  const services = data?.services;
  const reviews = reviewsData?.reviews;

  return (
    <div className="services-page-container">
      <h2>Our Services </h2>
      <div className="services-container-main">
        {/* If there are services, show on UI. */}
        {services?.length > 0 &&
          services.map((service) => 
            <div key={service._id} className="service-card">
              
              <h3>{service.name}</h3>
              <p>{service.description}</p>

              {/* Show example review in short view. */}
              { reviews && 
                <CroppedReview reviews={reviews} serviceName={service.name} serviceId={service._id} />
              }

            </div>
          )}
      </div>

    </div>

  );
};

export default Services;
