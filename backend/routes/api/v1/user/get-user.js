import { getUser } from "../../../../controllers/user/UserController.js";

export default async (req, res) => {
  try {
    const { id } = req.params;
    let { user } = await getUser(id);
    res.json({ user });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  }
}