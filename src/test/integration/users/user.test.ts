import request from 'supertest';
import app from '../../../app'; // Your app entry point
import userRepository from '../../../userRepository'; // Assume a repository for user operations
import { userData } from '../../utils/auth.utils';


beforeAll(async () => {
    process.env.JWT_SECRET = 'your_jwt_secret';
    process.env.JWT_EXPIRES_IN = '1h';

    await userRepository.clear();
});

describe('User CRUD API', () => {
    let userId: string; // Store the user ID for update and delete tests

    beforeEach(async () => {
        await userRepository.clear(); // Clear mock data before each test
    });

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send(userData)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(userData.name);
        userId = response.body.id; // Store user ID for later tests
    });

    it('should read a user by ID', async () => {
        // First, create a user to ensure we have one to retrieve
        const createResponse = await request(app)
            .post('/api/users')
            .send(userData)
            .set('Accept', 'application/json');

        const response = await request(app)
            .get(`/api/users/${createResponse.body.id}`)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id', createResponse.body.id);
        expect(response.body.name).toBe(userData.name);
    });

    it('should update a user', async () => {
        // Create a user first
        const createResponse = await request(app)
            .post('/api/users')
            .send(userData)
            .set('Accept', 'application/json');

        const updatedData = { ...userData, name: 'Jane Doe' };

        const response = await request(app)
            .put(`/api/users/${createResponse.body.id}`)
            .send(updatedData)
            .set('Accept', 'application/json');

        expect(response.status).toBe(200);
        expect(response.body.name).toBe(updatedData.name);
    });

    it('should delete a user', async () => {
        // Create a user first
        const createResponse = await request(app)
            .post('/api/users')
            .send(userData)
            .set('Accept', 'application/json');

        const response = await request(app)
            .delete(`/api/users/${createResponse.body.id}`)
            .set('Accept', 'application/json');

        expect(response.status).toBe(204);
    });
});
