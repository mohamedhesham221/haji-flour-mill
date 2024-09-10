// A page component to update the service.
import "./styles/UpdateService.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllServicesQuery, useUpdateServiceMutation } from "../../store/APISlice";


// Gets the service id from the parameter.
// Gets the service details from the data returned by query and pre sets the form input values with service details.
// Updates the service value on submission.
const UpdateService = () => {

  const { id } = useParams();

  const navigate = useNavigate();
  
  // Set local state to get form input values using controlled form.
  const [name, setName] = useState("");
  const [cashPrice, setCashPrice] = useState(0);
  const [annualPrice, setAnnualPrice] = useState(0);
  const [description, setDescription] = useState("");

  // Get all services using query hook.
  // Here instead of getting a perticular service from server using the id, GetAllServices is used.
  // It's because most of the time when admin will come to this page, GetAllServices query would have been called earlier. So it will get the data from the cache instead of making a new request to the server.
  // It will improve performance of the app.
  const { data, isLoading, isError, error } = useGetAllServicesQuery();

  // Use Update Service Mutation hook to get a function which will trigger the mutation.
  const [updateService, {isLoading: isUpdating, isError: isUpdatingError, data: updateMessage }] = useUpdateServiceMutation();

  // Rerenders the component after the services has been successfully fetched and data has been returned from the query.
  // Gets the required service from the services array and pre set the values of form inputs to current service details.

  useEffect(() => {
    if (data) {

      const services = data.services;
      const serviceToEdit = services.find((service) => service._id === id);
      
      if (serviceToEdit) {
        setName(serviceToEdit.name);
        setCashPrice(serviceToEdit.price.cash);
        setAnnualPrice(serviceToEdit.price.annually);
        setDescription(serviceToEdit.description);
      }

    }
  }, [data, id]);

  // Rerenders the component after the service has been successfully updated and data has been returned from the mutation.
  // Show success message alert to the user.
  useEffect(() => {
    if (updateMessage) {
      alert(`Service updated successfully.`);
      // Navigate back to the previous page after successfully updating the service.
      // replace: true will replace the history stack top instead of adding at the top.
      navigate(-1, { replace: true });
    }
  }, [updateMessage]);
  
  // Show loading message on query loading.
  if (isLoading) return <p className="query-loading">Loading...</p>;

  // Show error message on query error.
  if (isError) {
    console.error(error);
    return <p className="query-error">An error has occured!</p>;
  }

  /**
   * Updates the service.
   * 
   * @param {Event} e event that triggered the function call.
   */
  const handleSubmit = async (e) => {
    // Prevent default behaviour of the event fire.
    e.preventDefault();

    // Store local states values in an object to send to server.
    const updatedServiceDetails = {
      name,
      price: {
        cash: cashPrice,
        annually: annualPrice,
      },
      description
    };

    // Trigger the mutation using updateService method with updated service data.
    // Reset the form input values to empty strings.
    try {

      await updateService({id, updatedServiceDetails}).unwrap();

    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="update-service-container">
      
      {isUpdatingError && <p className="query-error">Error in updating service.</p>}

      <h2>Update Service</h2>
      <form onSubmit={handleSubmit} className="update-service-form">
        <div className="form-group">
          <label htmlFor="name">Service Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cash">Cash Price</label>
          <input
            type="number"
            id="cash"
            name="cash"
            value={cashPrice}
            onChange={(e) => setCashPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="annually">Annual Price</label>
          <input
            type="number"
            id="annually"
            name="annually"
            value={annualPrice}
            onChange={(e) => setAnnualPrice(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Service Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="update-service-button" disabled={isUpdating}>{ isUpdating ? "Updating service..." : "Update Service" }</button>
      </form>
    </div>
  );
};

export default UpdateService;