import express from 'express';
import { auth } from '../middlewares/auth.js';
import {
    createTask,
    getAllTasks,
    getTaskById,
    updateTaskStatus,
    deleteTask,
} from '../controllers/taskController.js';

const router = express.Router();

// Create a new task
router.post('/', auth, createTask);

//Fetch all tasks for the authenticated user
router.get('/', auth, getAllTasks);

//Fetch a task by ID
router.get('/:id', auth, getTaskById);

//Update task status
router.put('/:id', auth, updateTaskStatus);

// Delete a task
router.delete('/:id', auth, deleteTask);

export default router;
