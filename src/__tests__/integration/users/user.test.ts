import request from 'supertest';
import app from '../../../app';
import { User } from '../../../types';
import userRepository from '../../../userRepository';
import { register, userData } from '../../utils/auth.utils';

let token = ''; // Store the JWT token

beforeAll(async () => {
  process.env.JWT_SECRET = 'your_jwt_secret';
  process.env.JWT_EXPIRES_IN = '1h';

  await userRepository.clear();

  // Register a user and store the JWT token
  const response = await register(userData);
  token = response.body.jwt;
});

describe('User CRUD API', () => {
  let newUser: User;

  const userPayload = {
    name: 'Jane Doe',
    email: 'jane@example.com',
    username: 'janedoe',
    password: 'Password@123',
  };

  // Create a new user
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send(userPayload)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data.name).toBe(userPayload.name);
    newUser = response.body.data;
  });

  // Read a user by ID
  it('should read a user by ID', async () => {
    const response = await request(app)
      .get(`/api/users/${newUser.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty('id', newUser.id);
    expect(response.body.data.name).toBe(userPayload.name);
  });

  // Update a user
  it('should update a user', async () => {
    const updatedData = { ...userPayload, name: 'Jane Doe Updated' };

    const response = await request(app)
      .put(`/api/users/${newUser.id}`)
      .send(updatedData)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.data.name).toBe(updatedData.name);
  });

  // Delete a user
  it('should delete a user', async () => {
    const response = await request(app)
      .delete(`/api/users/${newUser.id}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204); // 204 indicates successful deletion
  });
});
