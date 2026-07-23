// Todo Routes
import Router from "express";
import { Todo } from "../db/index.js";
import userMiddleware from "../middleware/user.js";

const router = Router();

router.get("/", userMiddleware, async (req, res) => { 
    const userId = req.user; // Assuming the user ID is set in the request by the middleware
    try {
        const todos = await Todo.find({ userId });
        res.status(200).json({ todos });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/addTodo", userMiddleware, async (req, res) => { 
    const userId = req.user; // Assuming the user ID is set in the request by the middleware
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required" });
    }
    
    try {
        const newTodo = new Todo({ title, description, userId });
        await newTodo.save();
        res.status(201).json({ message: "Todo created successfully", todo: newTodo });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})


router.put("/updateTodo/:id", userMiddleware, async (req, res) => {
    const userId = req.user; // Assuming the user ID is set in the request by the middleware
    const { id } = req.params;
    const { title, description, completed } = req.body;

    try {
        const todo = await Todo.findOne({ _id: id, userId });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        // Update the todo fields if provided
        if (title) todo.title = title;
        if (description) todo.description = description;
        if (completed !== undefined) todo.completed = completed;

        await todo.save();
        res.status(200).json({ message: "Todo updated successfully", todo });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/deleteTodo/:id", userMiddleware, async (req, res) => {
    const userId = req.user; // Assuming the user ID is set in the request by the middleware
    const { id } = req.params;

    try {
        const todo = await Todo.findOneAndDelete({ _id: id, userId });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;