import { Router } from "express";
import userRoutes from "./user/index.js";
import serviceRoutes from "./service/index.js";
import entryRoutes from "./entry/index.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/services", serviceRoutes);
router.use("/entries", entryRoutes);

export default router;