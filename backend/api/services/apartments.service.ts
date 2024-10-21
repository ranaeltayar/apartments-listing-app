import unitModel from "../../models/schemas/unit.model";
import {IListingResponse} from '../../models/api/responses/listing-response.interface';
import {messages} from '../../constants/messages.const';
import {HttpError} from '../handlers/errors/http-error';
import {IProject} from '../../models/interfaces/project.interface';
import ProjectModel from '../../models/schemas/project.model';
import {IAmenity} from '../../models/interfaces/amenity.interface';
import AmenityModel from '../../models/schemas/amenity.model';
import {ICreateListingRequest} from '../../models/api/requests/create-listing-request.interface';
import {IUnit} from '../../models/interfaces/unit.interface';

class ApartmentService {
    /**
     * Retrieve all apartments with pagination.
     *
     * @param {number} limit - The number of apartments to retrieve.
     * @param {number} offset - The number of apartments to skip.
     * @returns {Promise<IListingResponse>} The response containing listings and pagination info.
     */
    async getAllApartments(limit: number, offset: number): Promise<IListingResponse> {
        try {
            const units = await unitModel.find({}, 'name bedrooms bathrooms price imageUrls currency size compound')
                .skip(offset)
                .limit(limit)
                .exec();

            const total = await unitModel.countDocuments();
            return {
                message: messages.CREATION_SUCCESSFULLY,
                listings: units,
                pagination: {
                    total: total,
                    offset: offset,
                    limit: limit
                },
            };
        } catch (error) {
            throw new HttpError(messages.DATA_FETCHING_ERROR, 500);
        }
    }

    /**
     * Get details of a specific apartment by its ID.
     *
     * @param {string} id - The ID of the apartment.
     * @returns {Promise<IUnit>} The apartment details.
     */

    async getApartmentDetails(id: string): Promise<IUnit> {
        try {
            const apartment = await unitModel.findById(id).exec();
            if (!apartment) {
                throw new HttpError(messages.DATA_NOT_FOUND, 404);
            }
            return apartment;
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(messages.DATA_FETCHING_ERROR, 500);
        }
    }

    /**
     * Create a new apartment entry.
     *
     * @param {ICreateListingRequest} body - The request body containing apartment details.
     * @returns {Promise<IUnit>} The created apartment.
     */
    async createApartment(body: ICreateListingRequest): Promise<IUnit> {
        try {
            const project: IProject | null = await ProjectModel.findById(body.projectId);
            if (!project) {
                throw new HttpError(messages.PROJECT_NOT_FOUND, 404);
            }

            const amenitiesIds: string[] = body.amenitiesIds || [];
            let amenities: IAmenity[] = [];
            if (amenitiesIds.length > 0) {
                amenities = await AmenityModel.find({_id: {$in: amenitiesIds}});
                if (amenities.length !== amenitiesIds.length) {
                    throw new HttpError(messages.AMENITY_NOT_FOUND, 404);
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
            const newUnit = new unitModel(unitData);
            return await newUnit.save();
        } catch (error) {
            if (error instanceof HttpError) {
                throw error;
            }
            throw new HttpError(messages.CREATION_ERROR, 500);
        }
    }
}

export default new ApartmentService();
