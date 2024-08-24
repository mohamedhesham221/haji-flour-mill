import { getAllServices } from "../../../../controllers/service/ServiceController.js";

export default async (req, res) => {

  try {
    const { services } = await getAllServices();
    res.status(200).json({ services });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  }
}