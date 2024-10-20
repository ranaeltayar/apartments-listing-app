import express from "express";
import apartmentController from "../controllers/apartments.controller";

//TODO: ADD VALIDATION

const router = express.Router();

router.get("/", apartmentController.getAllApartments);
router.get("/:id", apartmentController.getApartmentDetails);
router.post("/", apartmentController.createApartment);

export default router;
