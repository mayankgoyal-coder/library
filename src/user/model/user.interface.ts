import { Book } from "src/book/entities/book.interface";

export interface User {
   id?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: Role;
    book:Book[]
}

export enum Role {
    ADMIN = 'admin',
    ISSUER = 'issuer',
    GUEST ='guest'
};