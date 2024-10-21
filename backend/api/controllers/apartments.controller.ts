import {NextFunction, Request, Response} from "express";
import apartmentService from "../services/apartments.service";
import mongoose from "mongoose";
import {messages} from '../../constants/messages.const';
import {HttpError} from '../handlers/errors/http-error';

class ApartmentController {

    /**
     * Get all units with pagination.
     *
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     *
     * @returns {Promise<void>} Returns a list of units in JSON format or an error message.
     *
     * @query {number} limit - Optional. Number of units to retrieve (default: 10).
     * @query {number} offset - Optional. Number of units to skip (default: 0).
     */
    getAllApartments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const {limit = 10, offset = 0} = req.query;
            const apartments = await apartmentService.getAllApartments(
                Number(limit),
                Number(offset),
            );
            res.status(200).json(apartments);
        } catch (error) {
            next(error);
        }
    };

    /**
     * Get details of a specific apartment by its ID.
     *
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     *
     * @returns {Promise<Response | void>} Returns the apartment details in JSON format or an error message.
     */

    getApartmentDetails = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const {id} = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new HttpError(messages.DATA_NOT_FOUND, 404);

            }
            const apartments = await apartmentService.getApartmentDetails(id);
            return res.status(200).json(apartments);
        } catch (error) {
            next(error);
        }
    };

    /**
     * Create a new apartment entry.
     *
     * @param {Request} req - The HTTP request object.
     * @param {Response} res - The HTTP response object.
     * @param {NextFunction} next - The next middleware function.
     *
     * @returns {Promise<Response>} Returns the created apartment in JSON format or an error message.
     *
     * @body {string} projectId - The ID of the project associated with the apartment.
     * @body {string[]} amenitiesIds - Optional. An array of IDs for amenities associated with the apartment.
     * @body {Object} additionalFields - Any additional fields necessary for creating the apartment.
     */
    createApartment = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const body = req.body;
            const apartment = await apartmentService.createApartment(body);
            return res.status(201).json(apartment);
        } catch (error) {
            next(error);
        }
    };
}

export default new ApartmentController();
