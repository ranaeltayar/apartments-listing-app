import {IListItem} from '@/app/responses/list-item.interface';

export interface IListingResponse {
    message: string;
    listings: IListItem[];
    pagination: {
        total: number;
        offset: number;
        limit: number;
    };
}
