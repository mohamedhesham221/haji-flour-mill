import "./styles/Services.css";

import { useGetAllServicesQuery } from "../../store/APISlice.js";

const Services = () => {
  const { data, isLoading, isError, error } = useGetAllServicesQuery();

  if (isLoading) return <p className="query-loading">Loading...</p>;

  if (isError) {
    console.error(error);
    return <p className="query-error">An error has occured!</p>;
  }

  const services = data?.services

  return (
    <div className="services-page-container">
      <h2>Our Services</h2>
      <div className="services-container">
        {services.length > 0 &&
          services.map((service) => (
            <div key={service._id} className="service-card">
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))}
      </div>

    </div>

  );
};

export default Services;
