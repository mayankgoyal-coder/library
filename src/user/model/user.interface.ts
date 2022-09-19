export interface User {
   id?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: Role;
}

export enum Role {
    ADMIN = 'admin',
    ISSUER = 'issuer',
    GUEST ='guest'
};