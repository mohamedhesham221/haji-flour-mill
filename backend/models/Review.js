import { model, Schema } from "mongoose";

const reviewSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  service_id: {
    type: Schema.Types.ObjectId,
    ref: "Service",
    required: true
  },
  rating: {
    type: Number,
    minimum: 0,
    maximum: 5,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Review = model("Review", reviewSchema);

export default Review;