export interface CreateUser {
    username: string;
    password: string;
}


export interface RetrieveUser {
    id: string | number;
    username: string;
    password?: string;
    // email?: string; // Optional property
    // Add any other properties you need
}
