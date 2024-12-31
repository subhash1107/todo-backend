import { Task } from '../models/Task.js';

// Create task controller
export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        const task = new Task({
            title,
            description,
            user: req.user._id,
        });

        const savedTask = await task.save();
        res.status(201).json(savedTask);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error creating task' });
    }
};

// Get all tasks controller
export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

// Get particular task by taskID controller
export const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid task ID' });
        }
        res.status(500).json({ error: 'Error fetching task' });
    }
};

// Update task status by taskID controller
export const updateTaskStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['pending', 'in-progress', 'completed'].includes(status)) {
            return res.status(400).json({
                error: 'Invalid status. Must be one of: pending, in-progress, completed',
            });
        }

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            { status },
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid task ID' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Error updating task' });
    }
};

// Update task by taskID controller
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(204).send();
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'Invalid task ID' });
        }
        res.status(500).json({ error: 'Error deleting task' });
    }
};
