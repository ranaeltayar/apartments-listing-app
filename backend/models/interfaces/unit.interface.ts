import {PropertyTypeEnum} from "../../constants/enums/property-type.enum";
import {SaleTypeEnum} from "../../constants/enums/sale-type.enum";
import {FinishingTypeEnum} from "../../constants/enums/finishing-type.enum";
import {IAmenity} from "./amenity.interface";
import {IListItem} from './list-item.interface';

export interface IUnit extends Document, IListItem {
    compound: string;
    propertyType: PropertyTypeEnum;
    saleType: SaleTypeEnum;
    description: string;
    refNumber: string;
    currency: string;
    price: string;
    finishingType: FinishingTypeEnum;
    amenities: IAmenity[];
    unitNumber: number;
}
