import request from 'supertest';
import app from '../../app';
import { CreateUserRequest } from '../../types';

export const userData = { 
    name: 'John Doe',
    email: 'john@example.com',
    username: 'johndoe',
    password: 'Password@123'
};

export const register = async (payload: Partial<CreateUserRequest>) => {
    return request(app)
        .post('/api/auth/register')
        .send(payload)
        .set('Accept', 'application/json');
}

export const login = async (username: string, password: string) => {
    return request(app)
        .post('/api/auth/login')
        .send({ username, password })
        .set('Accept', 'application/json');
};