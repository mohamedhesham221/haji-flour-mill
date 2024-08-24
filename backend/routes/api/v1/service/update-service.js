import { updateService } from "../../../../controllers/service/ServiceController.js";

export default async (req, res) => {
  const { id } = req.params;
  const updatedServiceDetails = req.body;

  try {
    const { message } = await updateService(id, updatedServiceDetails);
    res.status(200).json({ message });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  }
}