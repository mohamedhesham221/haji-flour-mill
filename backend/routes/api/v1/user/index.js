import { Router } from "express";
import { authanticateAdmin } from "../../../../middlewares/authAdmin.js";
import registerUser from "./register-user.js";
import loginUser from "./login-user.js";
import verifyUserToken from "./verify-user-token.js";
import getAllUsers from "./get-all-users.js";
import getUser from "./get-user.js";
import passport from "passport";

const router = Router();

router.post("/register", authanticateAdmin, registerUser);

router.post("/login", loginUser);

router.post("/verify", passport.authenticate("jwt", { session: false }), verifyUserToken);

router.get("/all", authanticateAdmin, getAllUsers);

router.get("/user/:identifier", passport.authenticate("jwt", { session: false }), getUser);

export default router