export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    password: string;
}

export interface CreateUserRequest {
    name: string;
    email: string;
    username: string;
    password: string;
}

export interface GetUserResponse {
    id: string | number;
    name: string;
    email: string;
    username: string;
    password?: string;
    // email?: string; // Optional property
    // Add any other properties you need
}
