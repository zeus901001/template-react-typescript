export interface IUser {
    id: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    permission: boolean,
    role: string,
    createdAt: Date,
    updatedAt: Date
}