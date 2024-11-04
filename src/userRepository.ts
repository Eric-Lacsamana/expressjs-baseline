import { v4 as uuidv4 } from 'uuid';
import { CreateUserRequest, GetUserResponse } from './types';

interface User {
	id: string;
	name: string;
	email: string;
	username: string;
	password: string;
}

const userDatabase: Map<string, User> = new Map();

interface WhereClause {
	id?: string;
	name?: string;
	email?: string;
	username?: string;
	password?: string;
	[key: string]: any;
}
  
interface FindOptions {
	sort?: { [key: string]: 'asc' | 'desc' };
	limit?: number;
}
  
interface FindParams {
	where?: WhereClause;
	options?: FindOptions;
}
  
interface FindOptions {
	sort?: { [key: string]: 'asc' | 'desc' }; // Sorting options
	limit?: number; // Limit for the number of results
}

const userRepository = {
    create: async ({ name, email, username, password }: CreateUserRequest): Promise<GetUserResponse> => {
    const id = uuidv4()
     userDatabase.set(username, { id, name, email, username, password });
   
     return { name, email, username, id };
   	},
	find: async (params: FindParams = {}): Promise<User[]> => {
		const { where = {}, options = {} } = params;
	  
		// If 'where' is empty, return all users
		if (Object.keys(where).length === 0) {
		  return Array.from(userDatabase.values());
		}
	  
		const results: User[] = [];
	  
		// Iterate through the userDatabase
		for (const user of userDatabase.values()) {
		  let matches = true;
	  
		  // Check each field in the where object
		  for (const [key, value] of Object.entries(where)) {
			if (user[key as keyof User] !== value) {
			  matches = false;
			  break; // Exit early if one doesn't match
			}
		  }
	  
		  // If all fields match, add user to results
		  if (matches) {
			results.push(user);
		  }
		}

		// Return empty array if no matches found
		if (results.length === 0) {
			return results; // Returns an empty array
		}
	  
		// Handle sorting if options.sort is defined and is an object
		if (options.sort && typeof options.sort === 'object') {
		  results.sort((a, b) => {
			for (const key in options.sort) {
			  const order = options.sort[key];
			  if (order === 'asc' || order === 'desc') {
				const aValue = a[key as keyof User];
				const bValue = b[key as keyof User];
	  
				if (aValue < bValue) return order === 'asc' ? -1 : 1;
				if (aValue > bValue) return order === 'asc' ? 1 : -1;
			  }
			}
			return 0; // If all compared fields are equal
		  });
		}
	  
		// Limit the number of results if specified
		if (options.limit) {
		  return results.slice(0, options.limit); // Return only up to 'limit' results
		}
	  
		return results; // Return all matching results
	},
	update: async (id: string, updates: Partial<User>): Promise<User | null> => {
		// Check if the user exists in the database
		const user = userDatabase.get(id);
		if (!user) {
		  return null; // Return null if user not found
		}
	  
		// Update user properties with provided updates
		Object.assign(user, updates);
	  
		// Optionally, you could return a new copy of the updated user
		return user; // Return the updated user
	},
   	delete: async (id: string): Promise<boolean> => {
		// Check if the user exists in the database
		const deleted = userDatabase.delete(id);
		return deleted; // Return true if the user was deleted, false if not found
	},
	clear: async () => userDatabase.clear(),
}

export default userRepository;
  