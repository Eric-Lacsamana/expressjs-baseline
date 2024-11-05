import jwt from 'jsonwebtoken';

interface GenerateTokenPayload {
    id: string | number;
    username: string;
}

const authService = {
    generateToken: ({ id, username }: GenerateTokenPayload) => {
        return jwt.sign({ id, username }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRES_IN as string,
        });
    },
};

export default authService;
