import { deleteService } from "../../../../controllers/service/ServiceController.js";

/**
 * Sends the delete success message in response along with success status.
 * 
 * If error occures in deleting the service, sends appropriate error message in response along with respective status. 
 */
export default async (req, res) => {
  const { id } = req.params;

  try {
    const { message } = await deleteService(id);
    res.status(200).json({ message });
  } catch (error) {
    error.status === 400
      ? error.message = "Service not found."
      : error.message = "Server error"
    res.status(error.status).json({ error });
  };
};