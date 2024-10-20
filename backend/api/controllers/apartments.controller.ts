import { Request, Response } from "express";
import apartmentService from "../services/apartments.service";
import mongoose from "mongoose";
import {messages} from '../../constants/messages.const';
import {IProject} from '../../models/interfaces/project.interface';
import ProjectModel from '../../models/schemas/project.model';
import {IAmenity} from '../../models/interfaces/amenity.interface';
import AmenityModel from '../../models/schemas/amenity.model';
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
      res.status(500).json({ message: messages.DATA_FETCHING_ERROR, error });
    }
  };

  getApartmentDetails = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(404)
          .json({ success: false, message: messages.DATA_NOT_FOUND });
      }
      const apartments = await apartmentService.getApartmentDetails(id);
      res.status(200).json(apartments);
    } catch (error) {
      res.status(500).json({ message: messages.DATA_FETCHING_ERROR, error });
    }
  };

  createApartment = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const project: IProject | null= await ProjectModel.findById(
          body.projectId,
      );
      if (!project) {
        return res.status(404).json({ message: messages.PROJECT_NOT_FOUND });
      }

      const amenitiesIds: string[] = body.amenitiesIds;
      let amenities: IAmenity[] = [];
      if (amenitiesIds && amenitiesIds.length > 0) {
        amenities = await AmenityModel.find({ _id: { $in: amenitiesIds } });
        if (amenities.length !== amenitiesIds.length) {
          return res.status(404).json({ message: messages.AMENITY_NOT_FOUND });
        }
      }

      const unitData = {
        ...body,
        project: {
          name: project.name,
          _id: project._id,
        },
        amenities: amenities.map(amenity => ({
          name: amenity.name,
          _id: amenity._id,
        })),
      };
      const apartment = await apartmentService.createApartment(unitData);
      res.status(200).json(apartment);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: messages.CREATION_ERROR, error });
    }
  };
}

export default new ApartmentController();
