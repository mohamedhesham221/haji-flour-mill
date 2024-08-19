import { Router } from "express";
import signupAdmin from "./signup-admin.js";
import loginAdmin from "./login-admin.js";
import passport from "passport";

const router = Router();

router
  .route("/signup")
  .get((req, res) => {
    res.render("adminSignUp");
  })
  .post(signupAdmin);

router.post("/login", loginAdmin);

// Temporary
router.get("/dashboard", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({message: "User authenticated"})
})

export default router