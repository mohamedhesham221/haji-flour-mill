// A page component to get entry details and add it to the server.
import "./styles/NewEntry.css";

import { useEffect, useState } from "react";

import { useGetAllServicesQuery } from "../../store/APISlice";
import { useAddNewEntryMutation } from "../../store/APISlice";

const NewEntry = () => {

  // Set local states to get form input values using controlled form.
  const [username, setUsername] = useState("");
  const [weight, setWeight] = useState("");
  const [selectedService, setSelectedService] = useState("");
  
  // Use query hook to get all the services, to show in select input of the form.
  const { data, isLoading, isError, error } = useGetAllServicesQuery();
  // Use Add New Entry mutation hook to add new entry in database.
  const [addNewEntry, { isLoading: isSubmitting, data: entryData }] = useAddNewEntryMutation();

  // Rerenders the component after the entry has been successfully added and data has been returned from the mutation.
  // Show success message alert to the user with the amount of the entry.
  useEffect(() => {
    if (entryData) alert(`Entry with amount INR ${entryData.entry.amount} added successfully.`);
  }, [entryData])

  /**
   * Adds new entry.
   * 
   * @param {Event} e event that causes the function call
   */
  const handleSubmit = async (e) => {
    // Prevent default behaviour of the event fire.
    e.preventDefault();

    // Trigger the mutation using addNewEntry method with entry data to store.
    // Reset the form input values to empty strings.
    try {
      await addNewEntry({ username, serviceId: selectedService, weight }).unwrap();
      setUsername("");
      setSelectedService("");
      setWeight("");
    } catch (error) {
      console.error("Failed to add entry", error);
    }
  };

  // Show loading message on query loading.
  if (isLoading) return <p className="query-loading">Loading...</p>;

  // Show error message on query error.
  if (isError) {
    console.error(error);
    return <p className="query-error">An error has occured!</p>;
  }

  // Get the services from the data returned by the query.
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
