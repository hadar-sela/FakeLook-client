
import { User } from "./user";

export interface Filter{
    publishers: User[];
    startDate: Date;
    endDate: Date;
    tags?: any[];
    usersTags: any[];
}