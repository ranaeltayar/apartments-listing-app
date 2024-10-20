import { Request, Response } from "express";
import apartmentService from "../services/apartments.service";
import mongoose from "mongoose";
//TODO: ERROR HANDLER
class ApartmentController {
  getAllApartments = async (req: Request, res: Response) => {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const apartments = await apartmentService.getAllApartments(
        Number(limit),
        Number(offset),
      );
      res.status(200).json(apartments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching apartments", error });
    }
  };

  getApartmentDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid Apartment Id" });
      }
      const apartments = await apartmentService.getApartmentDetails(id);
      res.status(200).json(apartments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching apartments", error });
    }
  };

  createApartment = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const apartment = await apartmentService.createApartment(body);
      res.status(200).json(apartment);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Error fetching apartments", error });
    }
  };
}

export default new ApartmentController();
