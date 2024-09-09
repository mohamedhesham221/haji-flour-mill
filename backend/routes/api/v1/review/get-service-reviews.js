import { getServiceReviews } from "../../../../controllers/review/ReviewController.js";

/**
 * Sends reviews posted for a perticular service in response along with success status.
 * 
 * In case of error sends error in response along with failure status.
 */
export default async (req, res) => {
  const { serviceId } = req.params;

  try {
    const { reviews } = await getServiceReviews(serviceId);
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  };
};