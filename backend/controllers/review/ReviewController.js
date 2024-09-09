import Review from "../../models/Review.js";

/**
 * Adds the review in database.
 * 
 * @param {Object} reviewDetails details of the review to save.
 * @returns a resolved promise with newly added review.
 */
export const addNewReview = async (reviewDetails) => {
  const { user, service, rating, description } = reviewDetails;

  try {
    const review = await Review.create({ user, service, rating, description });
    return Promise.resolve({ review });

  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  };
};

/**
 * Finds all the reviews.
 * 
 * @returns a resolved promise with all reviews.
 */
export const getAllReviews = async () => {
  try {
    // Use populate method to populate the user and service field with respective username and name.
    const reviews = await Review.find({}, { __v: 0 }).populate("user service", { username: 1, name: 1 });
    return Promise.resolve({ reviews });

  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  };
};

/**
 * Finds all the reviews posted by the user.
 * 
 * @param {ObjectId} userId id of the user, whose reviews are to return.
 * @returns a resolved promise with reviews of the user
 */
export const getReviewsByUser = async (userId) => {
  try {
    // Use populate method to populate the user and service field with respective username and name.
    const reviews = await Review.find({ user: userId }, { __v: 0 }).populate("user service", { username: 1, name: 1 });
    return Promise.resolve({ reviews });
  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  };
};

/**
 * Finds all the reviews posted for a service.
 * @param {ObjectId} serviceId id of the service, whose reviews are to return.
 * @returns a resolved promise with review of service.
 */
export const getServiceReviews = async (serviceId) => {
  try {
    // Use populate method to populate the user and service field with respective username and name.
    const reviews = await Review.find({ service: serviceId }, { __v: 0 }).populate("user service", { username: 1, name: 1 });
    return Promise.resolve({ reviews });
  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  };
};