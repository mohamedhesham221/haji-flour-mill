// A page component to get user details and add it to the server.
import React, { useEffect, useState } from "react";
import { useRegisterUserMutation } from "../../store/APISlice";
import './styles/NewUser.css';

const NewUser = () => {
  
  // Set local state to get form input values using controlled form.
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    payment_mode: "",
    password: ""
  });

  // Use Register User mutation hook to add new user in database.
  const [registerUser, { isLoading, isError, error, data }] = useRegisterUserMutation();

  // Rerenders the component after the user has been successfully added and data has been returned from the mutation.
  // Show success message alert to the user with the `unique username` returned by server.
  useEffect(() => {
    if (data) {
      alert(`User "${data.user.username}" created successfully.`)
    }
  }, [data]);

  // Changes the state value as input value changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  /**
   * Adds new user.
   * 
   * @param {Event} e event that triggered the function call.
   */
  const handleSubmit = async (e) => {
    // Prevent default behaviour of the event fire.
    e.preventDefault();

    // Trigger the mutation using registerUser method with form data.
    // Reset the form input values to empty strings.
    try {
      await registerUser(formData).unwrap();
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        password: "",
      });
    } catch (err) {
      console.error("Failed to create user:", err);
    }
  };

  return (
    <div className="new-user-form-container">
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit} className="new-user-form">
        <div className="form-group">
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile</label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Payment Mode</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="payment_mode"
                value="cash"
                checked={formData.payment_mode === "cash"}
                onChange={handleInputChange}
              />Cash
            </label>
            <label>
              <input
                type="radio"
                name="payment_mode"
                value="annually"
                checked={formData.payment_mode === "annually"}
                onChange={handleInputChange}
              />Annually
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit" disabled={isLoading} className="submit-button">
          {isLoading ? "Creating..." : "Create User"}
        </button>

        {isError && <p className="error-message">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default NewUser;
