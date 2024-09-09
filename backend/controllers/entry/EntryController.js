import Entry from "../../models/Entry.js";
import Service from "../../models/Service.js";
import User from "../../models/User.js";

/**
 * Adds a new entry in database.
 * 
 * @param {Object} entryDetails details of the entry to save.
 * @returns a resolved promise with newly added service.
 */
export const addNewEntry = async (entryDetails) => {
  const { username, serviceId, weight } = entryDetails;
  let amount = 0;

  // Before saving the entry in database, first calculate the total amount.
  try {

    // Find the payment-mode of the user.
    const user = await User.findOne({ username }, { payment_mode: 1, _id: 0 });

    const { payment_mode } = user || {};
    
    // Find the price structure of the entered service.
    const service = await Service.findById(serviceId, { price: 1, _id: 0 });

    const { price } = service || {};

    // If any one of the properties is not present, return the rejected promise with status 400: bad request.
    if (!payment_mode || !price) return Promise.reject({ status: 400 });

    // Calculate the amount for entry based on the payment-mode of the user.
    payment_mode === "cash" ? amount = weight * price.cash : amount = weight * price.annually;

    // Save the entry in database.
    const entry = await Entry.create({ user: username, service: serviceId, weight, amount });

    return Promise.resolve({ entry });
  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  };
};

/**
 * Finds all entries.
 * 
 * @returns a resolved promise with all entries.
 */
export const getAllEntries = async () => {

  try {
    const entries = await Entry.find({}, { __v: 0 }).populate("service", { name: 1 });

    return Promise.resolve({ entries });

  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  };
};

/**
 * Finds all entries of user.
 * 
 * @param {String} user username of the user to find entries.
 * @returns a resolved promise with entries of the user.
 */
export const getUserEntries = async (user) => {

  try {

    const entries = await Entry.find({ user }, { __v: 0 }).populate("service", { name: 1 });

    return Promise.resolve({ entries });
  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  }
}