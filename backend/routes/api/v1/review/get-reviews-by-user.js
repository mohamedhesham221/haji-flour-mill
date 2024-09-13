import { getReviewsByUser } from "../../../../controllers/review/ReviewController.js";

/**
 * Sends reviews posted by single user in response along with success status.
 * 
 * In case of error sends error in response along with failure status.
 */
export default async (req, res) => {
  const { username } = req.params;
  try {
    const { reviews } = await getReviewsByUser(username);
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  };
};