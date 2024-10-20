import mongoose from "mongoose";
import {IUnit} from "../interfaces/unit.interface";
import {PropertyTypeEnum} from "../../constants/enums/property-type.enum";
import {SaleTypeEnum} from "../../constants/enums/sale-type.enum";
import {FinishingTypeEnum} from "../../constants/enums/finishing-type.enum";
import AmenityModel from "./amenity.model";
import ProjectModel from './project.model';

const apartmentSchema = new mongoose.Schema<IUnit>({
    refNumber: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    number: {type: String, required: true},
    bedrooms: {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    imageUrls: {type: [String], default: []},
    compound: {type: String, required: true, unique: true},
    propertyType: {
        type: String,
        enum: Object.values(PropertyTypeEnum),
        required: true,
    },
    saleType: {
        type: String,
        enum: Object.values(SaleTypeEnum),
        required: true,
    },
    description: {type: String},
    currency: {type: String, required: true},
    price: {type: String, required: true},
    size: {type: String, required: true},
    project: {type: ProjectModel.schema, required: true},
    finishingType: {
        type: String,
        enum: Object.values(FinishingTypeEnum),
        required: true,
    },
    amenities: [{type: AmenityModel.schema, require: true}],
});

const unitModel = mongoose.model("unit", apartmentSchema);

export default unitModel;
