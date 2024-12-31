import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Funtion to generate JWT
export const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
};

// Function to verify JWT
export const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};
