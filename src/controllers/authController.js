import { User } from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import bcrypt from 'bcryptjs';

// Signup Controller
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Creating user
        const user = new User({ firstName, lastName, email, password });
        await user.save();

        // Generating JWT
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ 
            message: 'User created successfully',
            token 
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error creating user', message: error.message });
    }
};


// Signin Controller
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Finding user
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        
        // Generating JWT
        const token = generateToken(user._id);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error signing in' });
    }
};
