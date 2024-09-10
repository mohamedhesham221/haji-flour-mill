import { loginAdmin } from "../../controllers/admin/AdminController.js";

/** Returns the user and token to the response.
 * 
 * In case of error, returns response with appropriate status code and error message.
 */
export default async (req, res) => {
  try {
    // Extract and destructure the username and password from the request body.
    const { username, password } = req.body;

    // Extract and destructure the user and token from the resolved promise returned by loginAdmin.
    const { user, token } = await loginAdmin({ username, password });

    // Send the user and token to the response along with success status code.
    res.status(200).json({ user, token });

  } catch (error) {
    // Set the appropriate error message according to the status code and send the response.
    error.status === 403
      ? (error.message = "Access forbidden")
      : error.status === 400
      ? (error.message = "Incorrect username or password")
      : (error.message = "Server error");
    res.status(error.status).json(error);
  };
};
