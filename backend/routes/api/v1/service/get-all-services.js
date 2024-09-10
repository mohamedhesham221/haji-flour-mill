import { getAllServices } from "../../../../controllers/service/ServiceController.js";

/**
 * Sends all services in response along with the success status.
 * 
 * If error occures in getting all services, sends the error message with failure status.
 */
export default async (req, res) => {

  try {
    const { services } = await getAllServices();
    res.status(200).json({ services });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  };
};