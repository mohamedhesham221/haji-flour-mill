import { Router } from "express";
import { authanticateAdmin } from "../../../../middlewares/authAdmin.js";
import addNewEntry from "./add-new-entry.js";
import getAllEntries from "./get-all-entries.js";
import getUserEntries from "./get-user-entries.js";

const router = Router();

router.post("/new", authanticateAdmin, addNewEntry);

router.get("/all", authanticateAdmin, getAllEntries);

router.get("/user/:username", getUserEntries);


export default router;