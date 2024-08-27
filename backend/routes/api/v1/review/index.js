import { Router } from "express";
import { authanticateAdmin } from "../../../../middlewares/authAdmin.js";
import passport from "passport";
import addNewReview from "./add-new-review.js";
import getAllReviews from "./get-all-reviews.js";
import getReviewsByUser from "./get-reviews-by-user.js";
import getServiceReviews from "./get-service-reviews.js";

const router = Router();

router.post("/add", passport.authenticate("jwt", {session: false}), addNewReview);

router.get("/all", getAllReviews);

router.get("/user/:userId", authanticateAdmin, getReviewsByUser);

router.get("/service/:serviceId", getServiceReviews);

export default router;