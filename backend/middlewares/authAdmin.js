import passport from "passport";

export const authanticateAdmin = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (err) return res.status(500);
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!user.isAdmin) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  })(req, res, next);
}