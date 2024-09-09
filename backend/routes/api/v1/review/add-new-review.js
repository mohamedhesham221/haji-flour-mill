import { addNewReview } from "../../../../controllers/review/ReviewController.js"

/**
 * Sends the newly added review in response along with success status.
 * 
 * In case of error sends error in response along with failure status.
 */
export default async (req, res) => {

  let reviewDetails = req.body;

  // As only logged in users are allowed to submit review, request object has user details.
  // set the user id in reviewDetails object before saving to database.
  reviewDetails.user = req.user._id;

  try {

    const { review } = await addNewReview(reviewDetails);
    res.status(201).json({ review });

  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  };
};