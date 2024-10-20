import { Request, Response } from "express";
import apartmentService from "../services/apartments.service";
import mongoose from "mongoose";
import {messages} from '../../constants/messages.const';
import {IProject} from '../../models/interfaces/project.interface';
import ProjectModel from '../../models/schemas/project.model';
import {IAmenity} from '../../models/interfaces/amenity.interface';
import AmenityModel from '../../models/schemas/amenity.model';
class ApartmentController {

  /**
   * Get all units with pagination.
   *
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   *
   * @returns {Promise<void>} Returns a list of units in JSON format or an error message.
   *
   * @query {number} limit - Optional. Number of units to retrieve (default: 10).
   * @query {number} offset - Optional. Number of units to skip (default: 0).
   */
  getAllApartments = async (req: Request, res: Response): Promise<void> => {
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

  /**
   * Get details of a specific apartment by its ID.
   *
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   *
   * @returns {Promise<void>} Returns the apartment details in JSON format or an error message.
   *
   * @param {string} id - The ID of the apartment to retrieve.
   */

  getApartmentDetails = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
          .status(404)
          .json({ success: false, message: messages.DATA_NOT_FOUND });
      }
      const apartments = await apartmentService.getApartmentDetails(id);
      return res.status(200).json(apartments);
    } catch (error) {
      return res.status(500).json({ message: messages.DATA_FETCHING_ERROR, error });
    }
  };

  /**
   * Create a new apartment entry.
   *
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   *
   * @returns {Promise<Response>} Returns the created apartment in JSON format or an error message.
   *
   * @body {string} projectId - The ID of the project associated with the apartment.
   * @body {string[]} amenitiesIds - Optional. An array of IDs for amenities associated with the apartment.
   * @body {Object} additionalFields - Any additional fields necessary for creating the apartment.
   */
  createApartment = async (req: Request, res: Response): Promise<Response> => {
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
      return res.status(200).json(apartment);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: messages.CREATION_ERROR, error });
    }
  };
}

export default new ApartmentController();
