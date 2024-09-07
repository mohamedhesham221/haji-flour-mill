import "./styles/UpdateService.css";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetAllServicesQuery, useUpdateServiceMutation } from "../../store/APISlice";


const UpdateService = () => {

  const { id } = useParams();

  const navigate = useNavigate();
  

  const [name, setName] = useState("");
  const [cashPrice, setCashPrice] = useState(0);
  const [annualPrice, setAnnualPrice] = useState(0);
  const [description, setDescription] = useState("");

  const { data, isLoading, isError, error } = useGetAllServicesQuery();

  const [updateService, {isLoading: isUpdating, isError: isUpdatingError }] = useUpdateServiceMutation();

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
  
  if (isLoading) return <p className="query-loading">Loading...</p>;

  if (isError) {
    console.error(error);
    return <p className="query-error">An error has occured!</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedServiceDetails = {
      name,
      price: {
        cash: cashPrice,
        annually: annualPrice,
      },
      description
    };

    try {

      await updateService({id, updatedServiceDetails}).unwrap();

      alert(`Service ${name} updated successfully.`);

      navigate(-1, { replace: true });

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