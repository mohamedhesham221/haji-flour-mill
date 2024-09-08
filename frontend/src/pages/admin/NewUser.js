import React, { useState } from "react";
import { useRegisterUserMutation } from "../../store/APISlice";
import './styles/NewUser.css';

const NewUser = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    payment_mode: "",
    password: ""
  });

  const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data: ", formData);
    try {
      await registerUser(formData).unwrap();
      alert("User created successfully!");
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
