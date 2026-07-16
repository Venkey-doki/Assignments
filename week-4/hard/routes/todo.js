import { Todo } from "../database/index.js";
import { Router } from "express";
import userMiddleware from "../middleware/user.js";
const router = Router();

// todo Routes
router.post('/', userMiddleware, async (req, res) => {
    // Implement todo creation logic
    const { title, description } = req.body;
    const userId = req.user?.userId; // Assuming user ID is available in the request object after authentication
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const newTodo = new Todo({ title, description, userId });
    newTodo.save()
        .then(todo => res.status(201).json(todo))
        .catch(err => res.status(500).json({ error: err.message }));
});

router.put('/:id', userMiddleware, async (req, res) => {
    // Implement update todo  logic
    const allowedUpdates = ['title', 'description', 'completed'];

    const updates = Object.fromEntries(
        Object.entries(req.body).filter(([key, value]) => allowedUpdates.includes(key) && value !== undefined)
    );
    // Implement update todo logic
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!updatedTodo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(updatedTodo);
});

router.delete('/', userMiddleware, async (req, res) => {
    // Implement All delete todo logic
    const userId = req.user?.userId; // Assuming user ID is available in the request object after authentication
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try { 
        const result = await Todo.deleteMany({ userId: userId });
        res.status(200).json({ message: `${result.deletedCount} todos deleted` });
    }catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id', userMiddleware, async (req, res) => {
    // Implement delete todo by id logic
    const userId = req.user?.userId; // Assuming user ID is available in the request object after authentication
	if (!userId) {
		return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, userId: userId });
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" , deletedTodo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/', userMiddleware, async (req, res) => {
    // Implement fetching all todo logic
    const userId = req.user?.userId; // Assuming user ID is available in the request object after authentication
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const todos = await Todo.find({ userId: userId });
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/:id', userMiddleware, async (req, res) => {
    // Implement fetching todo by id logic
    const userId = req.user?.userId; // Assuming user ID is available in the request object after authentication
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const todo = await Todo.findOne({ _id: req.params.id, userId: userId });
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;