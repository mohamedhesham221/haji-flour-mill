import { model, Schema } from "mongoose";

const reviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "service",
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

const Review = model("review", reviewSchema);

export default Review;