import JWT from 'jsonwebtoken';
import { Router } from "express";
const router = Router();
import userMiddleware from "../middleware/user.js";
import { User, Todo } from "../database/index.js";

router.get("/", (req, res) => {
    res.send("User route is working");
});

// User Routes
router.post('/signup', async (req, res) => {
// Implement user signup logic
    const { username, password, email } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(400).json({ error: 'Username already exists' });
    }
    const newUser = new User({ username, password, email });
    await newUser.save();
    const token = JWT.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User created successfully', accessToken: token });
});

router.post('/login', async (req, res) => {
    // Implement user login logic
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) { 
        res.status(401).json({ error: 'Invalid username or password' });
        return;
    }
    const isPasswordValid = user.password === password; // In a real application, use hashed passwords and compare using bcrypt
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', accessToken: token });
});

router.get('/todos', userMiddleware, async (req, res) => {
    // Implement logic for getting todos for a user
    const userId = req.user.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const todos = await Todo.find({ userId });
    res.status(200).json(todos);
});

router.post('/logout', userMiddleware, async (req, res) => {
    // Implement logout logic
    // In a real application, you might want to handle token invalidation or blacklisting
    const userId = req.user.userId;
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = req.headers['authorization'];
    token = null; // Invalidate the token (in a real application, you might want to handle this differently)
    res.status(200).json({ message: 'Logout successful' });
});

export default router;