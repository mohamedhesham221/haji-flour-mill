import { Router } from "express";
import userRoutes from "./user/index.js";
import serviceRoutes from "./service/index.js";
const router = Router();

router.use("/users", userRoutes);
router.use("/services", serviceRoutes);

export default router;