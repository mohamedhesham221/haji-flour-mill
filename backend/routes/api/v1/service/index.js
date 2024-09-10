import { Router } from "express";
import { authanticateAdmin } from "../../../../middlewares/authAdmin.js";
import addService from "./add-service.js";
import updateService from "./update-service.js";
import deleteService from "./delete-service.js";
import getAllServices from "./get-all-services.js";
const router = Router();

// Authenticate admin in routes as only admin is allowed to add, update and delete the services.
router.post("/add", authanticateAdmin, addService);

router.put("/update/:id", authanticateAdmin, updateService);

router.delete("/delete/:id", authanticateAdmin, deleteService);

// Anyone can view the services.
router.get("/all", getAllServices);

export default router;