import { deleteService } from "../../../../controllers/service/ServiceController.js";

export default async (req, res) => {
  const { id } = req.params;

  try {
    const { message } = await deleteService(id);
    res.status(200).json({ message });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  }
}