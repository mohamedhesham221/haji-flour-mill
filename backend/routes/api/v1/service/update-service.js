import { updateService } from "../../../../controllers/service/ServiceController.js";

/** 
 * Sends the update successfull message in response along with the success status.
 * 
 * In case of error sends error in response along with failure status.
 */

export default async (req, res) => {
  // Get the id from parameters and service details from body in request object.
  const { id } = req.params;
  const updatedServiceDetails = req.body;

  try {
    const { message } = await updateService(id, updatedServiceDetails);
    res.status(200).json({ message });
  } catch (error) {
    error.status === 400
      ? error.message = "Service not found."
      : error.message = "Server error.";
    res.status(error.status).json({ error });
  };
};