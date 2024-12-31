import express from 'express';
import { signup, signin } from '../controllers/authController.js';

const router = express.Router();

// Signup router 
router.post('/signup', signup);

// Signin router
router.post('/signin', signin);

export default router;
