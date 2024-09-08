import { getUser } from "../../../../controllers/user/UserController.js";

export default async (req, res) => {
  try {
    const { identifier } = req.params;
    let { user } = await getUser(identifier);
    res.json({ user });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error" });
  }
}