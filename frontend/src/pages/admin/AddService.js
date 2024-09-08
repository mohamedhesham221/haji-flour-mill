import './styles/AddService.css';

import { useState } from 'react';
import { useAddServiceMutation } from '../../store/APISlice';

const AddService = () => {
  const [name, setName] = useState('');
  const [cashPrice, setCashPrice] = useState('');
  const [annualPrice, setAnnualPrice] = useState('');
  const [description, setDescription] = useState('');
  const [addService, { isLoading, isError, error }] = useAddServiceMutation();

  isError && console.error(error);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = {
      name,
      price: {
        cash: cashPrice,
        annually: annualPrice,
      },
      description,
    };

    try {
      await addService(serviceData).unwrap();
      setName('');
      setCashPrice('');
      setAnnualPrice('');
      setDescription('');
      alert('Service added successfully');
    } catch (error) {
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

        <button type="submit" disabled={isLoading} className="add-service-button">
          {isLoading ? 'Adding Service...' : 'Add Service'}
        </button>

        {isError && <p className="query-error">Failed to add service. Try again.</p>}
      </form>
    </div>
  );
};

export default AddService;
