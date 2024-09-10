import { Router } from "express";
import userRoutes from "./user/index.js";
import serviceRoutes from "./service/index.js";
import entryRoutes from "./entry/index.js";
import reviewRoutes from "./review/index.js";

const router = Router();

// Setup the routes to the appropriate path.
router.use("/users", userRoutes);
router.use("/services", serviceRoutes);
router.use("/entries", entryRoutes);
router.use("/reviews", reviewRoutes);

// Export the router to be used in main api router.
export default router;