export default (req, res) => {
  const user = req.user;
  if (user) {
    res.status(200).json({ user: { id: user._id, username: user.username, isAdmin: user.isAdmin } });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}