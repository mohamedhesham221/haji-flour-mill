import { getAllReviews } from "../../../../controllers/review/ReviewController.js";

/**
 * Sends all the reviews in the response along with the success status.
 * 
 * In case of error sends error in response along with failure status.
 */
export default async (req, res) => {
  try {
    const { reviews } = await getAllReviews();
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  };
};