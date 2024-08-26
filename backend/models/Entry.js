import { model, Schema } from "mongoose";

const entrySchema = new Schema({
  user: {
    type: String,
    required: true
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "service",
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Entry = model("entry", entrySchema);

export default Entry;