import * as express from 'express';
import { GetUserResponse } from '.';

declare global {
  namespace Express {
    interface Request {
      user?: GetUserResponse; // Define the user property with the expected shape
    }
  }
}
