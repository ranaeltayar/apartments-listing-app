import {IUnit} from '../../interfaces/unit.interface';

export interface ICreateListingRequest extends IUnit{
    projectId: string;
    amenitiesIds: string[];
}
