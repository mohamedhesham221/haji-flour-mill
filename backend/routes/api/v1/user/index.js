import { Router } from "express";
import registerUser from "./register-user.js";
import { authanticateAdmin } from "../../../../middlewares/authAdmin.js";

const router = Router();

router.post("/register", authanticateAdmin, registerUser);

router.post("/login", (req, res) => {
  res.json({ messsage: "Reached to the /api/v1/users/login route." });
});

router.get("/all", (req, res) => {
  res.json({ messsage: "Reached to the /api/v1/users/all route." });
});
router.get("/user/:id", (req, res) => {
  res.json({ messsage: "Reached to the /api/v1/users/user route." });
});

export default router