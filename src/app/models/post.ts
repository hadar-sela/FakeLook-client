import { User } from "./user";

export interface Post{
    id: number;
    description: string;
    imageSorce: string;
    x_Position: number;
    y_Position: number;
    z_Position: number;
    Date: string;
    UserId: number;
    user:User;
    tags?:any[];
}