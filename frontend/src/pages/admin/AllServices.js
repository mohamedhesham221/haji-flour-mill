import "./styles/AllServices.css"

import { useNavigate } from "react-router-dom";

import { useGetAllServicesQuery, useDeleteServiceMutation } from "../../store/APISlice"

const AllServices = () => {

  const navigate = useNavigate();

  const { data, isLoading, isError, error: loadingError } = useGetAllServicesQuery();

  const [deleteService, { isLoading: isDeleting, error: deletingError }] = useDeleteServiceMutation();

  if (isLoading) return <p className="query-loading">Loading...</p>;

  if (isError) {
    console.error(loadingError);
    return <p className="query-error">An error has occured!</p>;
  }

  const handleEdit = (id) => {
    navigate(`/admin/edit-service/${id}`);
  }

  const handleDelete = async (id, name) => {
    const confirm = window.confirm(`Confirm delete service ${name}`);

    if (confirm) {
      try {
        await deleteService(id).unwrap();
        alert(`"${name}" service deleted successfully.`)
      } catch (error) {
        console.error(error);
      }
    }
  }

  const services = data?.services;

  return (
    <div className="all-services-container">
      {deletingError && <p className="query-error">Error deleting service</p>}
      <h1>All Services</h1>
      <div className="services-grid">
        {services?.map((service) => (
          <div key={service._id} className="service-card">
            <h3>{service.name}</h3>
            <p><b>Cash Price:</b> ${service.price.cash}</p>
            <p><b>Annual Price:</b> ${service.price.annually}</p>
            <p><b>Description:</b> {service.description}</p>
            <div className="service-card-actions">
              <button onClick={() => handleEdit(service._id)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(service._id, service.name)} className="delete-button" disabled={isDeleting}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;