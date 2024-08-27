import { getAllReviews } from "../../../../controllers/review/ReviewController.js";

export default async (req, res) => {
  try {
    const { reviews } = await getAllReviews();
    res.status(200).json({ reviews });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  }
}