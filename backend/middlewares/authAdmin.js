import passport from "passport";

/**
 * Authenticates admin by applying additional checks in default passport authentication method.
 */
export const authanticateAdmin = (req, res, next) => {
  // Check for user authentication using passport.
  // If the returned user is not admin, then return the response with forbidden status, otherwise proceed further.
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return res.status(500);
    if (!user) return res.status(401).json({ message: "Unauthorized user" });
    if (!user.isAdmin) return res.status(403).json({ message: "Access forbidden" });
    req.user = user;
    next();
  })(req, res, next);
}