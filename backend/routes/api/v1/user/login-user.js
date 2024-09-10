import { loginUser } from "../../../../controllers/user/UserController.js";

/**
 * If user has been verified successfully, sends the user details and token in response along with success status.
 * If there is an error in verifying the user, sends the error message in response along with error status.
 */
export default async (req, res) => {
  const { username, password } = req.body;

  try {

    const { user, token } = await loginUser({ username, password });
    res.json({ user, token });

  } catch (error) {
    console.error(error);
    error.status === 400
      ? error.message = "Invalid credantials"
      : error.message = "Server error"
    res.status(error.status).json({ error });

  };
};
