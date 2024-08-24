import { model, Schema } from "mongoose";

const priceSchema = new Schema({
  cash: { type: Number },
  annually: { type: Number }
});

const serviceSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: priceSchema,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

const Service = model("service", serviceSchema);

export default Service;