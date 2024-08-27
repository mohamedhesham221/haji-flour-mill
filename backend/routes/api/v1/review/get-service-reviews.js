import { getServiceReviews } from "../../../../controllers/review/ReviewController.js";

export default async (req, res) => {
  const { serviceId } = req.params;

  try {
    const { reviews } = await getServiceReviews(serviceId);
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  }
}