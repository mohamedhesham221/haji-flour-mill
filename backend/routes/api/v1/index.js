import { Router } from "express";
import userRoutes from "./user/index.js";
import serviceRoutes from "./service/index.js";
import entryRoutes from "./entry/index.js";
import reviewRoutes from "./review/index.js";

const router = Router();

router.use("/users", userRoutes);
router.use("/services", serviceRoutes);
router.use("/entries", entryRoutes);
router.use("/reviews", reviewRoutes);

export default router;