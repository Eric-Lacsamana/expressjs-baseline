import bcrypt from 'bcryptjs';
import { CreateUserRequest, User } from '../../types';
import userRepository from '../../userRepository'; // This should refer to the mock user repository

const userService = {
	createUser: async ({ name, email, username, password }: CreateUserRequest) => {
		// Hash the password before saving
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user payload
		const newUser = { name,  email, username, password: hashedPassword };

		// Save the new user using the mock user repository
		return userRepository.create(newUser);
	},
	findUserById: async (id: string) => {
		// Retrieve a user by ID using the mock user repository
		const [user] = await userRepository.find({ where: { id } });
		return user;
	},
	findUserByUsername: async (username: string) => {
		// Retrieve a user by username using the mock user repository
		const [user] = await userRepository.find({ where: { username } });
		return user;
	},
	findAllUsers: () => {
		// Retrieve all users using the mock user repository
		return userRepository.find();
	},
	updateUserById: async (id: string, payload: Partial<User>)=> {

		const updates = {
			...payload,
		}

		if (updates.password) {
			updates.password = await bcrypt.hash(updates.password, 10);
		}

		return userRepository.update(id, updates);
	},
	deleteUserById: async (id: string) => userRepository.delete(id)
}

export default userService;
