import { getReviewsByUser } from "../../../../controllers/review/ReviewController.js";

export default async (req, res) => {
  const { userId } = req.params;

  try {
    const { reviews } = await getReviewsByUser(userId);
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  }
}