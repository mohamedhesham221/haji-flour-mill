// A page component to get review details and add it to the server.
import "./AddReview.css";

import { useEffect, useState } from "react";
import { useGetAllServicesQuery, useAddReviewMutation } from "../../store/APISlice";
import { shallowEqual, useSelector } from "react-redux";

const AddReview = () => {
  // Set local state variables to get values from input elements using controlled form.
  const [service, setService] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");

  // Get loggedIn user's user state from the store.
  const { user: loggedInUser } = useSelector(state => state.user, shallowEqual);

  // Use Get All Service Query to get all services.
  const { data: servicesData, isLoading: servicesLoading } = useGetAllServicesQuery();

  // Use Add Review Mutation to sent review details to server.
  const [addReview, { isLoading: isSubmitting, isError, error, data }] = useAddReviewMutation();

  // Rerenders the component after the review has been successfully added and data has been returned from the mutation.
  // Show success message alert to the user.
  useEffect(() => {
    if (data) {
      alert("Review added successfully!");
    }
  }, [data]);

  // If any error, print it on console
  isError && console.error(error);

  /**
   * Adds new review.
   * 
   * @param {Event} e event that causes the function call
   */
  const handleSubmit = async (e) => {
    // Prevent default behaviour of the event fire.
    e.preventDefault();

    // Trigger the mutation using addReview method with entry data to store.
    // Reset the form input values to empty strings.
    try {
      await addReview({ user: loggedInUser.id, service, rating, description }).unwrap();
      setService("");
      setRating("");
      setDescription("");
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  // Get services form query data returned from query to use in select input element.
  const services = servicesData?.services;

  return (
    <div className="add-review-container">
      <h1>Add Review</h1>
      <form onSubmit={handleSubmit} className="add-review-form">
        
        <label htmlFor="service">Service</label>
        <select
          id="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
          disabled={servicesLoading}
        >
          <option value="" disabled>Select service</option>
          {services?.map((service) => (
            <option key={service._id} value={service._id}>
              {service.name}
            </option>
          ))}
        </select>


        <label className="rating">Rating:</label>
        <input
          id="rating"
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="0"
          max="5"
          required
        />
        

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
        />
        

        <button type="submit" disabled={isSubmitting} className="add-review-button">
          {isSubmitting ? "Adding Review..." : "Add Review"}
        </button>

        {isError && <p className="query-error">Failed to add review. Please try again.</p>}
      </form>
    </div>
  );
};

export default AddReview;
