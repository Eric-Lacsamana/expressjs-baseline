import { v4 as uuidv4 } from 'uuid';
import { CreateUser, RetrieveUser } from './types';

const userDatabase: Map<string, { id: string; username: string; password: string }> = new Map();

export const createUser = async ({username, password}: CreateUser): Promise<RetrieveUser> => {
 const id = uuidv4()
  userDatabase.set(username, { id, username, password });

  return { username, id }; // Return user data without password
};

export const findUserById = (id: string) => {
    // Find user by iterating through the map
    for (const user of userDatabase.values()) {
        console.log('user', user);
      if (user.id === id) {
        return user;
      }
    }
    return null; // Return null if not found
};


export const findUserByUsername = (username: string) => {
  return userDatabase.get(username);
};

export const userExists = (username: string) => {
  return userDatabase.has(username);
};

export const findAllUsers = () => {
    // Return an array of users, excluding the password
    return Array.from(userDatabase.values()).map(({ id, username }) => ({ id, username }));
};
  