import Joi from 'joi';
import {PropertyTypeEnum} from '../../constants/enums/property-type.enum';
import {SaleTypeEnum} from '../../constants/enums/sale-type.enum';
import {FinishingTypeEnum} from '../../constants/enums/finishing-type.enum';
import {NextFunction, Request, Response} from 'express';

const propertyTypeValues = Object.values(PropertyTypeEnum);
const saleTypeValues = Object.values(SaleTypeEnum);
const finishingTypeValues = Object.values(FinishingTypeEnum);

const amenitySchema = Joi.object({
    name: Joi.string().required(),
});

const projectSchema = Joi.object({
    name: Joi.string().required(),
});

const unitSchema = Joi.object({
    name: Joi.string().min(3).required(),
    unitNumber: Joi.number().integer().required(),
    bedrooms: Joi.number().integer().required(),
    bathrooms: Joi.number().integer().required(),
    imageUrls: Joi.array().items(Joi.string()).default([]),
    compound: Joi.string().required(),
    propertyType: Joi.string()
        .valid(...propertyTypeValues)
        .required(),
    saleType: Joi.string()
        .valid(...saleTypeValues)
        .required(),
    description: Joi.string().allow(''),
    currency: Joi.string().required(),
    price: Joi.string().required(),
    size: Joi.string().required(),
    projectId: Joi.string().required().length(24).hex().required(),
    amenitiesIds: Joi.array()
        .items(Joi.string().length(24).hex().required())
        .default([]),
    finishingType: Joi.string()
        .valid(...finishingTypeValues)
        .required(),
});

export const validateCreateUnit = (
    req: Request,
    res: Response,
    next: NextFunction,
): Response | void => {
    const {error, value} = unitSchema.validate(req.body, {abortEarly: false});
    if (error) {
        return res.status(400).json({
            success: false,
            errors: error.details.map((err) => ({
                message: err.message,
                path: err.path,
                type: err.type,
                context: err.context,
            })),
        });
    }
    next();
};
