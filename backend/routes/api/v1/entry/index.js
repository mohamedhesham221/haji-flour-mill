import { Router } from "express";
import { authanticateAdmin } from "../../../../middlewares/authAdmin.js";
import addNewEntry from "./add-new-entry.js";
import getAllEntries from "./get-all-entries.js";
import getUserEntries from "./get-user-entries.js";
import passport from "passport";

const router = Router();

router.post("/new", authanticateAdmin, addNewEntry);

router.get("/all", authanticateAdmin, getAllEntries);

router.get("/user/:username", passport.authenticate("jwt", {session: false}), getUserEntries);


export default router;