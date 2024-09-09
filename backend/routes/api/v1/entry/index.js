import { Router } from "express";
import { authanticateAdmin } from "../../../../middlewares/authAdmin.js";
import addNewEntry from "./add-new-entry.js";
import getAllEntries from "./get-all-entries.js";
import getUserEntries from "./get-user-entries.js";
import passport from "passport";

const router = Router();

// Only admin can add a new entry and see all the entries.
router.post("/new", authanticateAdmin, addNewEntry);

router.get("/all", authanticateAdmin, getAllEntries);

// Any logged in user can see it's entries.
router.get("/user/:username", passport.authenticate("jwt", {session: false}), getUserEntries);

export default router;