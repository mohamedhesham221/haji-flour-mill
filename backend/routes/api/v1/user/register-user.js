import { registerUser } from "../../../../controllers/user/UserController.js";

// If user has been registered successfully, send the user details in response along with success status.
// If there is an error in creating the user, send the error message in response along with error status.
export default async (req, res) => {
  const userDetails = req.body;
  try {
    let { user } = await registerUser(userDetails);
    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  };
};