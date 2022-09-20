import { User } from "src/user/model/user.interface";

export interface Book {
    id?: string;
    name?: string;
    ISBN?: string;
    category?: string;
    slug?:string;
    price?: number;
    quantity?:number;
    author?: User;
    createdAt?: Date;
    updatedAt?: Date;
}