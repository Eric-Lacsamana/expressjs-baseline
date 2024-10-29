import * as express from 'express';
import { RetrieveUser } from '.';

declare global {
  namespace Express {
    interface Request {
      user?: RetrieveUser; // Define the user property with the expected shape
    }
  }
}
