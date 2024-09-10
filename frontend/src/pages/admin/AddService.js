// A page component to add a new service.
import './styles/AddService.css';

import { useEffect, useState } from 'react';
import { useAddServiceMutation } from '../../store/APISlice';

const AddService = () => {
  // Set local states to get form input values using controlled form.
  const [name, setName] = useState('');
  const [cashPrice, setCashPrice] = useState('');
  const [annualPrice, setAnnualPrice] = useState('');
  const [description, setDescription] = useState('');

  // Call AddService Mutation hook and get the triggering function with other options.
  const [addService, { isLoading, isError, error, data }] = useAddServiceMutation();

  // Rerenders the component after the service has been successfully added and data has been returned from the mutation.
  // Show success message alert to the user.
  useEffect(() => {
    if (data) {
      alert('Service added successfully');
    }
  }, [data])

  // If any error in adding the service, print on console.
  isError && console.error(error);

  // Sends the form data to server on submit.
  const handleSubmit = async (e) => {
    // Prevent default behaviour of the event fire.
    e.preventDefault();

    // Store local states values in an object to send to server.
    const serviceData = {
      name,
      price: {
        cash: cashPrice,
        annually: annualPrice,
      },
      description,
    };

    // Trigger the mutation using addService method with service data.
    // Reset the form input values to empty strings.
    try {
      await addService(serviceData).unwrap();
      setName('');
      setCashPrice('');
      setAnnualPrice('');
      setDescription('');
    } catch (error) {
      // If any error in adding the serice, print on console.
      console.error('Failed to add service:', error);
    }
  };

  return (
    <div className="add-service-container">
      <h1>Add New Service</h1>
      <form onSubmit={handleSubmit} className="add-service-form">
        <label>
          Service Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Cash Price:
          <input
            type="number"
            value={cashPrice}
            onChange={(e) => setCashPrice(e.target.value)}
            required
          />
        </label>

        <label>
          Annual Price:
          <input
            type="number"
            value={annualPrice}
            onChange={(e) => setAnnualPrice(e.target.value)}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            required
          />
        </label>

        {/* Disable and change the button text while mutation is in process. */}
        <button type="submit" disabled={isLoading} className="add-service-button">
          {isLoading ? 'Adding Service...' : 'Add Service'}
        </button>

        {/* If error in adding the service, show the message to the user. */}
        {isError && <p className="query-error">Failed to add service. Try again.</p>}
      </form>
    </div>
  );
};

export default AddService;
