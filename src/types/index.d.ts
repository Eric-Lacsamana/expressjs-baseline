export interface CreateUserRequest {
    username: string;
    password: string;
}

export interface GetUserResponse {
    id: string | number;
    username: string;
    password?: string;
    // email?: string; // Optional property
    // Add any other properties you need
}
