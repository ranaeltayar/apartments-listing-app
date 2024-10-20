import ApartmentModel from "../../models/schemas/unit.model";
import unitModel from "../../models/schemas/unit.model";
import {IListingResponse} from '../../models/api/responses/listing-response.interface';
import {messages} from '../../constants/messages.const';
import {IUnit} from '../../models/interfaces/unit.interface';

class ApartmentService {
    async getAllApartments(limit: number, offset: number): Promise<IListingResponse> {
        try {
            const units = await ApartmentModel.find({}, 'name bedrooms bathrooms price imageUrls currency size compound')
                .skip(offset)
                .limit(limit)
                .exec();

            const total = await ApartmentModel.countDocuments();
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
            throw new Error(messages.DATA_FETCHING_ERROR);
        }
    }

    async getApartmentDetails(id: string) {
        try {
            const apartment = await ApartmentModel.findById(id).exec();
            if (!apartment) {
                throw new Error(messages.DATA_NOT_FOUND);
            }
            return apartment;
        } catch (error) {
            throw new Error(messages.DATA_FETCHING_ERROR);
        }
    }

    async createApartment(unitData: IUnit) {
        try {
            const newUnit = new unitModel(unitData);
            return await newUnit.save();
        } catch (error) {
            console.log(error)
            throw new Error(messages.CREATION_ERROR);
        }
    }
}

export default new ApartmentService();
