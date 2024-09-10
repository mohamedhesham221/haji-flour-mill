// A page component to show all services.
import "./styles/AllServices.css"

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useGetAllServicesQuery, useDeleteServiceMutation } from "../../store/APISlice"

// Displays all the services in cards.
// Service card contains service details as well as the `edit` and `delete` button.
// Clicking the edit button will navigate to another page to edit service, clicking the delete button will delete the service after confirmation.
const AllServices = () => {

  const navigate = useNavigate();

  // Use query hook to get all the services on rendering the component.
  const { data, isLoading, isError, error: loadingError } = useGetAllServicesQuery();

  // Use Delete Service mutation hook to delete service.
  const [deleteService, { error: deletingError, data: deleteMessage }] = useDeleteServiceMutation();

  // Rerenders the component after the service has been successfully deleted and data has been returned from the mutation.
  // Show success message alert to the user.
  useEffect(() => {
    if (deleteMessage) {
      alert(`Service deleted successfully.`)
    }
  }, [deleteMessage])

  // Show loading message on query loading.
  if (isLoading) return <p className="query-loading">Loading...</p>;

  // Show error message on query error.
  if (isError) {
    console.error(loadingError);
    return <p className="query-error">An error has occured!</p>;
  }

  /**
   * Navigates admin to a page to edit the service of provided id.
   * 
   * @param {ObjectId} id service id that is to be edited
   */
  const handleEdit = (id) => {
    navigate(`/admin/edit-service/${id}`);
  }

  /**
   * Deletes a service.
   * 
   * @param {ObjectId} id service id that is to be deleted.
   * @param {String} name service name that is to be deleted.
   */
  const handleDelete = async (id, name) => {
    // Ask for confirmation before deleting the service.
    const confirm = window.confirm(`Confirm delete service ${name}`);

    // If confirmed, delete the service.
    if (confirm) {
      try {
        await deleteService(id).unwrap();
      } catch (error) {
        console.error(error);
      }
    }
  }

  // Get the services from the data returned by the query.
  const services = data?.services;

  return (
    <div className="all-services-page-container">
      {/* Show delete error message if any error while deleting the service. */}
      {deletingError && <p className="query-error">Error deleting service</p>}
      <h1>All Services</h1>
      <div className="services-container">
        {services?.map((service) => (
          <div key={service._id} className="service-card">
            <h3>{service.name}</h3>
            <p><b>Cash Price:</b> {service.price.cash} <small>Rs</small>/<small>Kg</small></p>
            <p><b>Annual Price:</b> {service.price.annually} <small>Rs</small>/<small>Kg</small></p>
            <p><b>Description:</b> {service.description}</p>
            <div className="service-card-actions">
              <button onClick={() => handleEdit(service._id)} className="edit-button">Edit</button>
              <button onClick={() => handleDelete(service._id, service.name)} className="delete-button">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;