// A page component to show reviews of a perticular service in MainLayout.
import { useParams } from "react-router-dom";

import { useGetServiceReviewsQuery } from "../../store/APISlice";
import ReviewCard from "../../components/ReviewCard";

const ServiceReviews = () => {

  const { serviceId } = useParams();

  // Get all the Reviews of service usin query hook.
  const { data, isLoading, isError, error } = useGetServiceReviewsQuery(serviceId);

  // Show loading message on query loading.
  if (isLoading) return <p className="query-loading">Loading...</p>;

  // Show error message on query error.
  if (isError) {
    console.error(error);
    return <p className="query-error">An error has occured!</p>;
  };

  const reviews = data?.reviews;

  return (
    <div className="service-reviews-page-container">
      {reviews && 
        reviews.map(review => <ReviewCard key={review._id} review={review} />)
      }
    </div>
  )

};

export default ServiceReviews;