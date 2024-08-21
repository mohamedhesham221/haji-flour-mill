import { getAllUsers } from "../../../../controllers/user/UserController.js";

export default async (req, res) => {
  try {
    let { users } = await getAllUsers();
    res.json({ users });
  } catch (error) {
    res.status(error.status).json({ ...error, message: "Server error"});
  }
}