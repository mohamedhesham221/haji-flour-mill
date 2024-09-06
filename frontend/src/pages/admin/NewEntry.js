import "./styles/NewEntry.css";

import { useState } from "react";

import { useGetAllServicesQuery } from "../../store/APISlice";
import { useAddNewEntryMutation } from "../../store/APISlice";

const NewEntry = () => {
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedService, setSelectedService] = useState("");
  
  const { data, isLoading, isError, error } = useGetAllServicesQuery();
  const [addNewEntry, { isLoading: isSubmitting }] = useAddNewEntryMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addNewEntry({ username, serviceId: selectedService, weight }).unwrap();
      alert("Entry added successfully");
      setUsername("");
      setSelectedService("");
      setWeight("");
    } catch (error) {
      console.error("Failed to add entry", error);
      alert("Error adding entry");
    }
  };

  if (isLoading) return <p className="query-loading">Loading...</p>;

  if (isError) {
    console.error(error);
    return <p className="query-error">An error has occured!</p>;
  }

  const { services } = data;

  return (
    <div className="new-entry-container">
      <h2>Add New Entry</h2>
      <form className="new-entry-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="service">Service</label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="" disabled>Select service</option>
            {services?.map(service =>
              <option
                key={service._id}
                value={service._id}
              >
                {service.name}
              </option>
            )}
          </select>
        </div>
        
        
        <div className="input-group">
          <label htmlFor="weight">Weight</label>
          <input 
            type="number" 
            id="weight" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            required
          />
        </div>
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default NewEntry;
