import bcrypt from 'bcryptjs';
import { CreateUserRequest } from '../../types';
import userRepository from '../../userRepository'; // This should refer to the mock user repository
import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';

const userService = {
	createUser: async ({ username, password }: CreateUserRequest) => {
		// Hash the password before saving
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user payload
		const newUser = { username, password: hashedPassword };

		// Save the new user using the mock user repository
		return userRepository.create(newUser);
	},
	findUserById: (id: string) => {
		// Retrieve a user by ID using the mock user repository
		return userRepository.find({ where: { id } });
	},
	findUserByUsername: async (username: string) => {
		// Retrieve a user by username using the mock user repository
		const [user] = await userRepository.find({ where: { username } });
		return user;
	},
	findAllUsers: () => {
		// Retrieve all users using the mock user repository
		return userRepository.find();
	}
}

export default userService;
