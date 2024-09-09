/**
 * If the user is present in request object, sends the user details in response along with success status.
 * If user is not present, sends the error message in response along with status 401: unauthorized.
 */
export default (req, res) => {
  const user = req.user;
  if (user) {
    res.status(200).json({ user: { id: user._id, username: user.username, isAdmin: user.isAdmin } });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  };
};