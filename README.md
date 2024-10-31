# Express.js Baseline

## Overview

This is a basic Express.js application template designed to provide a foundational setup for building web applications or APIs. It includes essential features such as routing, error handling, and middleware, with TypeScript support.

## Features

- RESTful API structure
- User registration and authentication
- JWT-based authentication
- In-memory user database (or connect to your preferred database)
- Custom error handling
- TypeScript support

## Prerequisites

- Node.js (>= 14.x)
- npm or yarn

## Installation

1. Clone the repository:
   git clone https://github.com/yourusername/expressjs-baseline.git
   cd expressjs-baseline

2. Install dependencies:
   npm install

   Or if you prefer Yarn:
   yarn install

3. Compile TypeScript files (if using TypeScript):
   npm run build

## Running the Application

1. Start the server:
   ```npm start```

   Or for development with automatic restarts:
   ```npm run dev```

2. Open your browser or API client (like Postman) and navigate to:
   http://localhost:3000

## API Endpoints

### User Registration

- **POST** /api/register
  - Request body:
    ```json
    {
      "username": "string",
      "password": "string"
    }```
  - Response:
    - Success: 201 Created
    - Conflict: 409 Conflict (if username already exists)

### User Login

- **POST** /api/login
  - Request body:
    ```json
    {
      "username": "string",
      "password": "string"
    }```
  - Response:
    - Success: 200 OK with JWT token
    - Unauthorized: 401 Unauthorized (if invalid credentials)

### Error Handling

Errors are handled centrally. In case of errors, the response format will be:
```json
{
  "status": "error",
  "statusCode": <number>,
  "message": "Error message"
}```

## Development

### Running Tests

If you have tests set up, you can run them using:
npm test

### Code Linting

This project uses ESLint for code linting. You can lint your code with:
npm run lint

### Scripts Overview

- **build**: Compiles TypeScript files to JavaScript.
- **start**: Runs the compiled server.
- **dev**: Runs the server in development mode with automatic restarts.

## Dependencies

- **bcryptjs**: For password hashing.
- **express**: Web framework for Node.js.
- **jsonwebtoken**: For handling JWTs.
- **uuid**: For generating unique identifiers.

## Dev Dependencies

- **@types/bcryptjs**: Type definitions for bcryptjs.
- **@types/express**: Type definitions for Express.
- **@types/jsonwebtoken**: Type definitions for jsonwebtoken.
- **@types/node**: Type definitions for Node.js.
- **nodemon**: For automatically restarting the server during development.
- **ts-node**: TypeScript execution engine for Node.js.
- **typescript**: TypeScript language support.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the ISC License. See the LICENSE file for details.
