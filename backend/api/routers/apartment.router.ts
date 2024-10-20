import express from "express";
import apartmentController from "../controllers/apartments.controller";
import {validateCreateUnit} from '../validations/creation.validation';

//TODO: ADD VALIDATION

const router = express.Router();

router.get("/", apartmentController.getAllApartments);
router.get("/:id", apartmentController.getApartmentDetails);
router.post("/", validateCreateUnit,apartmentController.createApartment);

export default router;
