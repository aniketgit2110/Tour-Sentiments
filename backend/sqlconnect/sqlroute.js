import  Express  from "express";
import { findTourById, findTours, getTours } from "./sqlcontroller.js";

const router = Express.Router()

router.get("/" , getTours)
router.get("/search" , findTours)
router.get("/:id", findTourById); 

export default router;