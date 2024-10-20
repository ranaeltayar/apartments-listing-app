import {IProject} from './project.interface';

export interface IListItem {
    name: string;
    bedrooms: number;
    bathrooms: number;
    price: string;
    currency: string;
    compound: string;
    imageUrls: string[];
    size: string;
    project: IProject;
}
