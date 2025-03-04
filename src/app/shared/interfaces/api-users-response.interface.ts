import { IUser } from "./user.interface";

export interface IAPIUsersResponse {
    page:        number;
    per_page:    number;
    total:       number;
    total_pages: number;
    results:     IUser[];
}

