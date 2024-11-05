import { v4 as uuidv4 } from 'uuid';
import { CreateUserRequest, GetUserResponse } from './types';

// Define the structure of a User object
interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    password: string;
}

// In-memory database to store users using Map
const userDatabase: Map<string, User> = new Map();

// Define structure for filtering users (where clauses)
interface WhereClause {
    id?: string;
    name?: string;
    email?: string;
    username?: string;
    password?: string;
    [key: string]: any; // Allow additional dynamic fields
}

// Define options for find query (like sorting and limiting results)
interface FindOptions {
    sort?: { [key: string]: 'asc' | 'desc' }; // Sorting options
    limit?: number; // Limit the number of results returned
}

// Define parameters for finding users (includes where clauses and options)
interface FindParams {
    where?: WhereClause; // Filters for querying users
    options?: FindOptions; // Sorting and pagination options
}

// Repository with CRUD operations for user data
const userRepository = {
    // Create a new user
    create: async ({ name, email, username, password }: CreateUserRequest): Promise<GetUserResponse> => {
        const id = uuidv4(); // Generate a unique ID for the new user
        const user: User = { id, name, email, username, password };

        userDatabase.set(id, user); // Add the user to the in-memory database

        return { name, email, username, id }; // Return a simplified response
    },

    // Find users with optional filters and options
    find: async (params: FindParams = {}): Promise<User[]> => {
        const { where = {}, options = {} } = params;

        // If no filtering is provided, return all users
        if (Object.keys(where).length === 0) {
            return Array.from(userDatabase.values());
        }

        const results: User[] = [];

        // Iterate through all users to check if they match the filtering criteria
        for (const user of userDatabase.values()) {
            let matches = true;

            // Check each filter condition in the 'where' clause
            for (const [key, value] of Object.entries(where)) {
                if (user[key as keyof User] !== value) {
                    matches = false; // Stop if any condition doesn't match
                    break;
                }
            }

            // If all conditions are met, add user to results
            if (matches) {
                results.push(user);
            }
        }

        // If no matches are found, return an empty array
        if (results.length === 0) {
            return results;
        }

        // Handle sorting if specified
        if (options.sort && typeof options.sort === 'object') {
            results.sort((a, b) => {
                for (const key in options.sort) {
                    const order = options.sort[key];
                    if (order === 'asc' || order === 'desc') {
                        const aValue = a[key as keyof User];
                        const bValue = b[key as keyof User];

                        // Compare values for sorting
                        if (aValue < bValue) return order === 'asc' ? -1 : 1;
                        if (aValue > bValue) return order === 'asc' ? 1 : -1;
                    }
                }
                return 0; // Return 0 if all compared fields are equal
            });
        }

        // Apply limit if specified
        if (options.limit) {
            return results.slice(0, options.limit); // Limit the number of results returned
        }

        return results; // Return all results
    },

    // Update an existing user
    update: async (id: string, updates: Partial<User>): Promise<User | null> => {
        const user = userDatabase.get(id); // Retrieve the user by ID

        if (!user) {
            return null; // Return null if the user is not found
        }

        Object.assign(user, updates); // Apply updates to the user

        return user; // Return the updated user
    },

    // Delete a user by their ID
    delete: async (id: string): Promise<boolean> => {
        const deleted = userDatabase.delete(id); // Delete the user from the in-memory database
        return deleted; // Return true if the user was deleted, false otherwise
    },

    // Clear all users from the database
    clear: async (): Promise<void> => {
        userDatabase.clear(); // Clear the entire user database
    },
};

export default userRepository;
