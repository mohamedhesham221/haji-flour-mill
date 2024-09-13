// A simple component to render section links in admin page.
import { Link } from "react-router-dom";

const ReviewSection = () => {
  return (
    <div className="section">
      <h3>Reviews</h3>
      <ul>
        <li><Link to="all-reviews">All Reviews</Link></li>
        <li><Link to="service-reviews">Service Reviews</Link></li>
        <li><Link to="user-reviews">Reviews by User</Link></li>
      </ul>
    </div>
  );
};

export default ReviewSection;