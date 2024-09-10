// A page component to show pricing of the services.
import "./styles/Pricing.css";

import { useGetAllServicesQuery } from "../../store/APISlice.js";

// Gets the service prices and shows on UI.
const Pricing = () => {
  // Use GetAllServices Query to get all the services.
  const { data, isLoading, isError, error } = useGetAllServicesQuery();

  // Show loading message on query loading.
  if (isLoading) return <p className="query-loading">Loading...</p>;

  // Show error message on query error.
  if (isError) {
    console.error(error);
    return <p className="query-error">An error has occured!</p>;
  }

  // Get services from the data returned by the query.
  const services = data?.services;

  return (
    <div className="pricing-page-container">
      <h2>Our Pricing</h2>
      <div className="pricing-container">
        {/* If there are services, show their pricing on UI. */}
        {services?.length > 0 &&
          services.map((service) => (
            <div key={service._id} className="pricing-card">
              <h3>{service.name}</h3>
              <p>
                Price (Cash): {service.price.cash} <small>Rs</small>/
                <small>Kg</small>
              </p>
              <p>
                Price (Annually): {service.price.annually} <small>Rs</small>/
                <small>Kg</small>
              </p>
            </div>
          ))}
      </div>
    </div>

  );
};

export default Pricing;
