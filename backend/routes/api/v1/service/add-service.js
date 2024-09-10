import { addService } from "../../../../controllers/service/ServiceController.js";

/**
 * Sends newly added service in response on succussfully storing in database along with success status.
 * 
 * In case of error sends error in response along with failure status.
 */
export default async (req, res) => {
  const serviceDetails = req.body;

  try {
    const { service } = await addService(serviceDetails);
    res.status(201).json({ service });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  };
};