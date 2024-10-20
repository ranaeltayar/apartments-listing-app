import mongoose from "mongoose";
import {IUnit} from "../interfaces/unit.interface";
import {PropertyTypeEnum} from "../../constants/enums/property-type.enum";
import {SaleTypeEnum} from "../../constants/enums/sale-type.enum";
import {FinishingTypeEnum} from "../../constants/enums/finishing-type.enum";
import AmenityModel from "./amenity.model";
import ProjectModel from './project.model';

const unitSchema = new mongoose.Schema<IUnit>({
    refNumber: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    unitNumber: {type: Number, required: true},
    bedrooms: {type: Number, required: true},
    bathrooms: {type: Number, required: true},
    imageUrls: {type: [String], default: []},
    compound: {type: String, required: true},
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
    amenities: [{type: AmenityModel.schema, required: true}],
});

unitSchema.pre('validate', function (next) {
    const unit = this as IUnit;
   console.log(unit.refNumber)
    if (!unit.refNumber) {
        const timestamp = Date.now().toString();
        const randomNum = Math.floor(Math.random() * 10000);
        unit.refNumber = `AP-${timestamp}-${randomNum}`;
    }

    next();
});

const unitModel = mongoose.model("unit", unitSchema);

export default unitModel;
