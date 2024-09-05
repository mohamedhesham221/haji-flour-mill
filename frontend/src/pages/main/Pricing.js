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
    <div className="pricing">
      <h2>Our Pricing</h2>
      <ul>
        {services.length > 0 &&
          services.map((service) => (
            <li key={service._id}>
              <h3>{service.name}</h3>
              <p>
                Price (Cash): {service.price.cash} <small>Rs</small>/
                <small>Kg</small>
              </p>
              <p>
                Price (Annually): {service.price.annually} <small>Rs</small>/
                <small>Kg</small>
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Pricing;
