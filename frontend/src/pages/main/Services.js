import { useGetAllServicesQuery } from "../../store/APISlice.js";

const Services = () => {
  const { data, isLoading, isError, error } = useGetAllServicesQuery();

  if (isLoading) return <p className="query-loading">Loading...</p>;

  if (isError) {
    console.error(error);
    return <p className="query-error">An error has occured!</p>;
  }

  let services = [];
  if (data) services = data.services;

  return (
    <div className="services">
      <h2>Our Services</h2>
      <ul>
        {services.length > 0 &&
          services.map((service) => (
            <li key={service._id}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Services;
