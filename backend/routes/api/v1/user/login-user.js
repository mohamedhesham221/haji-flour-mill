import { loginUser } from "../../../../controllers/user/UserController.js";

export default async (req, res) => {
  const { username, password } = req.body;

  try {

    const { user, token } = await loginUser({ username, password });
    res.json({ user, token });

  } catch (error) {

    error.status === 400
      ? error.message = "Invalid credantials"
      : error.message = "Server error"
    res.status(500).json({ error });

  }
}
