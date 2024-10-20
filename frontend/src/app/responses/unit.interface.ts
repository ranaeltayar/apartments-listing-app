import {IListItem} from './list-item.interface';
import {PropertyTypeEnum} from '@/app/responses/enums/property-type.enum';
import {SaleTypeEnum} from '@/app/responses/enums/sale-type.enum';
import {FinishingTypeEnum} from '@/app/responses/enums/finishing-type.enum';
import {IAmenity} from '@/app/responses/amenity.interface';

export interface IUnit extends IListItem {
    _id: string;
    compound: string;
    propertyType: PropertyTypeEnum;
    saleType: SaleTypeEnum;
    description: string;
    currency: string;
    price: string;
    location: Location;
    finishingType: FinishingTypeEnum;
    amenities: IAmenity[];
    number: string;
}
