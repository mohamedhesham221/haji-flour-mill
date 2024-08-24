import { addService } from "../../../../controllers/service/ServiceController.js";

export default async (req, res) => {
  const serviceDetails = req.body;

  try {
    const { service } = await addService(serviceDetails);
    res.status(201).json({ service });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  }
}