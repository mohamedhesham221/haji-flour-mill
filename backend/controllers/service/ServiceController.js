import Service from "../../models/Service.js";

/**
 * Adds the service in database.
 * 
 * @param {Object} serviceDetails details of the service to save
 * @returns a resolved promise with newly added service.
 */
export const addService = async (serviceDetails) => {

  const { name, price, description } = serviceDetails;

  try {
    const service = await Service.create({ name, price, description });
    return Promise.resolve({ service });
  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  };
};

/**
 * Updates a service of given id with the provided details.
 * 
 * @param {ObjectId} id service's id to search to update
 * @param {Object} updatedServiceDetails details of the service
 * @returns a resolved promise with update successfull message.
 */
export const updateService = async (id, updatedServiceDetails) => {
  const { name, price, description } = updatedServiceDetails;

  try {
    // Find and update the service.
    // option `new: true` ensures that updated service is returned from the findByIdAndUpdate query instead of older service.
    const updatedService = await Service.findByIdAndUpdate(id, { name, price, description }, { new: true, runValidators: true });

    // If no service is returned from the query return the rejected promise with status 400: bad request
    if (!updatedService) {
      console.log(`Service with id ${id} not found.`);
      return Promise.reject({ status: 400 });
    }

    return Promise.resolve({ message: "Service updated successfully." });

  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  };
};

/**
 * Deletes a service with provided id.
 * 
 * @param {ObjectId} id service id to delete.
 * @returns a resolved promise with delete success message.
 */
export const deleteService = async (id) => {
  try {
    const deletedService = await Service.findByIdAndDelete(id);

    // If no service is returned from the query, return a rejected promise with status 400: bad request.
    if (!deletedService) {
      console.log(`Service with id ${id} not found.`);
      return Promise.reject({ status: 400 });
    };

    return Promise.resolve({ message: "Service deleted successfully." });
  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  };
};

/**
 * Finds all the services.
 * 
 * @returns a resolved promise with all services.
 */
export const getAllServices = async () => {
  try {

    const services = await Service.find({}, { __v: 0 }).sort({ name: 1 });
    return Promise.resolve({ services });

  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  };
};