import { loginAdmin } from "../../controllers/admin/AdminController.js";

export default async (req, res) => {
  try {
    const { username, password } = req.body;
    const { user, token } = await loginAdmin({ username, password });

    res.status(200).json({ user, token });
  } catch (error) {
    error.status === 403
      ? (error.message = "Access forbidden")
      : error.status === 400
      ? (error.message = "Incorrect username or password")
      : (error.message = "Server error");
    res.status(error.status).json(error);
  }
};
