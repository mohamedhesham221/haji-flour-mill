import { Router } from "express";

const router = Router();

router.post("/add", (req, res) => { res.json({message: "Reached the /add route."}) });

router.post("/update/:id", (req, res) => { res.json({message: "Reached the /update/:id route."}) });

router.post("/delete/:id", (req, res) => { res.json({message: "Reached the /delete/:id route."}) });

router.get("/all", (req, res) => { res.json({message: "Reached the /all route."}) });

export default router;