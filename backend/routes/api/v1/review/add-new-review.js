import { addNewReview } from "../../../../controllers/review/ReviewController.js"

export default async (req, res) => {
  let reviewDetails = req.body;
  reviewDetails.user = req.user._id;

  try {

    const { review } = await addNewReview(reviewDetails);
    res.status(201).json({ review });

  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  }
}