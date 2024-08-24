import { model, Schema } from "mongoose";

const entrySchema = new Schema({
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