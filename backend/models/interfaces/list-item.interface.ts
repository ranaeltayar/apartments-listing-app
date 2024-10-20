import {IProject} from './project.interface';

export interface IListItem {
    name: string;
    refNumber: string;
    bedrooms: number;
    bathrooms: number;
    area: number;
    price: string;
    currency: string;
    compound: string;
    imageUrls: string[];
    size: string;
    project: IProject;
}
