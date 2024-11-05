import request from 'supertest';
import app from '../../../app';
import userRepository from '../../../userRepository';
import { User } from '../../../types';
import { login, register, userData } from '../../utils/auth.utils';

beforeAll(async () => {
    // Set up environment variables for JWT handling
    process.env.JWT_SECRET = 'your_jwt_secret';
    process.env.JWT_EXPIRES_IN = '1h';

    await userRepository.clear();  // Clear user data before tests
});

describe('Auth API', () => {
    let user: User;  // Store the registered user for login tests

    it('should return 400 for invalid user data', async () => {
        const { username } = userData;
        const response = await register({ username });

        expect(response.status).toBe(400);
        expect(response.body.message).toBeDefined();
    });

    it('should register a new user', async () => {
        const response = await register(userData);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('jwt');
        expect(response.body.user).toHaveProperty('id');
        expect(response.body.user.name).toBe(userData.name);
        expect(response.body.user.email).toBe(userData.email);
        expect(response.body.user.username).toBe(userData.username);

        user = response.body.user;  // Store user for subsequent login test
    });

    it('should successfully log in with valid credentials', async () => {
        const response = await login(user.username, userData.password);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('jwt');
        expect(response.body.user).toHaveProperty('id', user.id);
    });
});
