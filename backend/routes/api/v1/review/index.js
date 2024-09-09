import { Router } from "express";
import { authanticateAdmin } from "../../../../middlewares/authAdmin.js";
import passport from "passport";
import addNewReview from "./add-new-review.js";
import getAllReviews from "./get-all-reviews.js";
import getReviewsByUser from "./get-reviews-by-user.js";
import getServiceReviews from "./get-service-reviews.js";

const router = Router();

// Any logged in user can post a review.
router.post("/add", passport.authenticate("jwt", {session: false}), addNewReview);

// Anyone can access the reviews.
router.get("/all", getAllReviews);

// Only Admin can get the reviews posted by a user.
router.get("/user/:userId", authanticateAdmin, getReviewsByUser);

// Anyone can access the reviews for a perticular service.
router.get("/service/:serviceId", getServiceReviews);

export default router;