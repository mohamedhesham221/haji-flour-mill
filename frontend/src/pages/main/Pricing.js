import "./styles/Pricing.css";

import { useGetAllServicesQuery } from "../../store/APISlice.js";

const Pricing = () => {
  const { data, isLoading, isError, error } = useGetAllServicesQuery();

  if (isLoading) return <p className="query-loading">Loading...</p>;

  if (isError) {
    console.error(error);
    return <p className="query-error">An error has occured!</p>;
  }

  let services = [];
  if (data) services = data.services;

  return (
    <div className="pricing-page-container">
      <h2>Our Pricing</h2>
      <div className="pricing-container">
        {services.length > 0 &&
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
