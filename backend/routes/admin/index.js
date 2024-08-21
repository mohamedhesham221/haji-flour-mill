import { Router } from "express";
import signupAdmin from "./signup-admin.js";
import loginAdmin from "./login-admin.js";
import { authanticateAdmin } from "../../middlewares/authAdmin.js";

const router = Router();

router
  .route("/signup")
  .get((req, res) => {
    res.render("adminSignUp");
  })
  .post(signupAdmin);

router.post("/login", loginAdmin);

// Temporary
router.get("/dashboard", authanticateAdmin, (req, res) => {
  res.json({message: "Admin authenticated"})
})

export default router