import {NextFunction, Request, Response} from "express";
import apartmentService from "../services/apartments.service";
import mongoose from "mongoose";
import {messages} from '../../constants/messages.const';
import {HttpError} from '../handlers/errors/http-error';

class ApartmentController {

    /**
     * @swagger
     * /units:
     *   get:
     *     summary: Get all units
     *     tags: [units]
     *     description: Get all units with pagination.
     *     parameters:
     *       - name: limit
     *         in: query
     *         description: Optional. Number of units to retrieve. Default is 10.
     *         required: false
     *         schema:
     *           type: integer
     *           default: 10
     *       - name: offset
     *         in: query
     *         description: Optional. Number of units to skip. Default is 0.
     *         required: false
     *         schema:
     *           type: integer
     *           default: 0
     *     responses:
     *       200:
     *         description: A list of apartments retrieved successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 type: object
     *                 properties:
     *                   _id:
     *                     type: string
     *                   projectId:
     *                     type: string
     *                   amenitiesIds:
     *                     type: array
     *                     items:
     *                       type: string
     *                   additionalFields:
     *                     type: object
     *       500:
     *         description: Internal server error.
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
     * @swagger
     * /units/{id}:
     *   get:
     *     summary: Get unit details
     *     tags: [units]
     *     description: Get details of a specific apartment by its ID.
     *     parameters:
     *       - name: id
     *         in: path
     *         description: The ID of the apartment.
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: The apartment details retrieved successfully.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 _id:
     *                   type: string
     *                 projectId:
     *                   type: string
     *                 amenitiesIds:
     *                   type: array
     *                   items:
     *                     type: string
     *                 additionalFields:
     *                   type: object
     *       404:
     *         description: Apartment not found.
     *       500:
     *         description: Internal server error.
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
     * @swagger
     * /units:
     *   post:
     *     summary: Create a new unit
     *     tags: [units]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               bedrooms:
     *                 type: integer
     *                 example: 3
     *               bathrooms:
     *                 type: integer
     *                 example: 2
     *               name:
     *                 type: string
     *                 example: "katameya heights"
     *               unitNumber:
     *                 type: integer
     *                 example: 1
     *               imageUrls:
     *                 type: array
     *                 items:
     *                   type: string
     *                   format: uri
     *                 example: [
     *                   "https://i.ibb.co/TBWcK47/Katameya-Heights.jpg",
     *                   "https://i.ibb.co/bQbdrQM/4e3b5560b8c9b7463f4a5b0e34edbf76.jpg"
     *                 ]
     *               compound:
     *                 type: string
     *                 example: "katameya heights"
     *               propertyType:
     *                 type: string
     *                 example: "Villa"
     *               saleType:
     *                 type: string
     *                 example: "Resale"
     *               description:
     *                 type: string
     *                 example: "A beautiful villa in the heart of the city with modern amenities and stunning views."
     *               currency:
     *                 type: string
     *                 example: "USD"
     *               price:
     *                 type: string
     *                 example: "25000000"
     *               size:
     *                 type: string
     *                 example: "1500"
     *               finishingType:
     *                 type: string
     *                 example: "Finished"
     *               projectId:
     *                 type: string
     *                 example: "67158002598a1667f3dd6410"
     *               amenitiesIds:
     *                 type: array
     *                 items:
     *                   type: string
     *                 example: [
     *                   "67157ee1598a1667f3dd6409",
     *                   "67157f0d598a1667f3dd640a",
     *                   "67157f3a598a1667f3dd640b",
     *                   "67157f48598a1667f3dd640c"
     *                 ]
     *     responses:
     *       201:
     *         description: Successfully created apartment
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Apartment created successfully"
     *                 apartment:
     *                   type: object
     *                   additionalProperties: true  # to allow for dynamic response object
     *       400:
     *         description: Bad request
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Invalid input data"
     *       404:
     *         description: Not found
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 error:
     *                   type: string
     *                   example: "Project not found"
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
