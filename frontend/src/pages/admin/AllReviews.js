import ReviewCard from "../../components/ReviewCard";
import { useGetAllReviewsQuery } from "../../store/APISlice";

const AllReviews = () => {

  const { data, isLoading, isError, error } = useGetAllReviewsQuery();

  // Show loading message on query loading.
  if (isLoading) return <p className="query-loading">Loading...</p>;

  // Show error message on query error.
  if (isError) {
    console.error(error);
    return <p className="query-error">An error has occured!</p>;
  };

  const reviews = data?.reviews;

  return (
    <div className="all-reviews-page-container">
      <h2>All Reviews</h2>
      {/* If there are reviews, show on UI. */}
      {reviews?.length > 0 && 
        reviews.map(review => <ReviewCard key={review._id} review={review} />)
      }
    </div>
  );
};

export default AllReviews;