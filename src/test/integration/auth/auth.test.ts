    import request from 'supertest';
    import app from '../../../app';
    import userRepository from '../../../userRepository';
    import { User } from '../../../types';
    import { login, register, userData } from '../../utils/auth.utils';


    beforeAll(async () => {
        process.env.JWT_SECRET = 'your_jwt_secret';
        process.env.JWT_EXPIRES_IN = '1h';

        await userRepository.clear();
    });

    describe('Auth API', () => {
        let user: User; 

        it('should return 400 for invalid user data', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send({ username: userData.username })
                .set('Accept', 'application/json');

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

            // Populate the user variable with the registered user data
            user = response.body.user;
        });


        it('should successfully log in with valid credentials', async () => {
            // Use the registered user's credentials
            const response = await login(user.username, userData.password); // Use userData.password if available
            
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('jwt');
            expect(response.body.user).toHaveProperty('id', user.id);
        });
    });