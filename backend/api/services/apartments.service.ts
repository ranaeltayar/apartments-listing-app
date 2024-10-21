import unitModel from "../../models/schemas/unit.model";
import {IListingResponse} from '../../models/api/responses/listing-response.interface';
import {messages} from '../../constants/messages.const';
import {HttpError} from '../handlers/errors/http-error';
import {IProject} from '../../models/interfaces/project.interface';
import ProjectModel from '../../models/schemas/project.model';
import {IAmenity} from '../../models/interfaces/amenity.interface';
import AmenityModel from '../../models/schemas/amenity.model';
import {ICreateListingRequest} from '../../models/api/requests/create-listing-request.interface';

class ApartmentService {
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
            }
        } catch (error) {
            throw new HttpError(messages.DATA_FETCHING_ERROR, 500);
        }
    }

    async getApartmentDetails(id: string) {
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

    async createApartment(body: ICreateListingRequest) {
        try {
            const project: IProject | null = await ProjectModel.findById(
                body.projectId,
            );
            if (!project) {
                throw new HttpError(messages.PROJECT_NOT_FOUND, 404);
            }

            const amenitiesIds: string[] = body.amenitiesIds;
            let amenities: IAmenity[] = [];
            if (amenitiesIds && amenitiesIds.length > 0) {
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
