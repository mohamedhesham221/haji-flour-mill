// A simple component to render section links in admin page.
import { Link } from "react-router-dom";

const ServiceSection = () => {
  return (
    <div className="section">
      <h3>Services</h3>
      <ul>
        <li><Link to="add-service">Add Service</Link></li>
        <li><Link to="all-services">All Services</Link></li>
      </ul>
    </div>
  );
};

export default ServiceSection;