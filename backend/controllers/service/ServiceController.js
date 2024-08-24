import Service from "../../models/Service.js";

export const addService = async (serviceDetails) => {

  const { name, price, description } = serviceDetails;

  try {
    const service = await Service.create({ name, price, description });
    return Promise.resolve({ service });
  } catch (error) {
    console.error(error);
    return Promise.reject({status: 500});
  }
  
}

export const updateService = async (id, updatedServiceDetails) => {
  const { name, price, description } = updatedServiceDetails;

  try {
    const updatedService = await Service.findByIdAndUpdate(id, { name, price, description }, { new: true, runValidators: true });

    if (!updatedService) {
      console.log(`Service with id ${id} not found.`);
      return Promise.reject({ status: 500 });
    }

    return Promise.resolve({ message: "Service updated successfully." });

  } catch (error) {
    console.error(error);
    return Promise.reject({status: 500});
  } 
}

export const deleteService = async (id) => {
  try {
    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      console.log(`Service with id ${id} not found.`);
      return Promise.reject({ status: 500 });
    }

    return Promise.resolve({ message: "Service deleted successfully." });
  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  }
}

export const getAllServices = async () => {
  try {

    const services = await Service.find({}, { _id: 0, __v: 0 }).sort({name: 1});
    return Promise.resolve({ services });

  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  }
}