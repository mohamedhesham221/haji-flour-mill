import Review from "../../models/Review.js";

export const addNewReview = async (reviewDetails) => {
  const { user, service, rating, description } = reviewDetails;

  try {
    const review = await Review.create({ user, service, rating, description });
    return Promise.resolve({ review });

  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  }
}


export const getAllReviews = async () => {
  try {
    const reviews = await Review.find({}, { __v: 0 }).populate("user service", { username: 1, name: 1 });
    return Promise.resolve({ reviews });

  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  }
}


export const getReviewsByUser = async (userId) => {
  try {
    const reviews = await Review.find({ user: userId }, { __v: 0 }).populate("user service", { username: 1, name: 1 });
    return Promise.resolve({ reviews });
  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  }
}


export const getServiceReviews = async (serviceId) => {
  try {
    const reviews = await Review.find({ service: serviceId }, { __v: 0 }).populate("user service", { username: 1, name: 1 });
    return Promise.resolve({ reviews });
  } catch (error) {
    console.error(error);
    return Promise.reject({ status: 500 });
  }
}