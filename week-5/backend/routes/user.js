//user middleware
import jwt from "jsonwebtoken";
import { User } from "../db/index.js";

import Router from "express";
const router = Router();

router.post("/signup", async (req, res) => { 
    const { userName, email, password } = req.body;
    try {
        //check if user already exists
        if (!(userName && email && password)) { 
            res.status(400).json({ message: "Username, email, and password are required" });
        }

        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Create a new user
        const newUser = new User({ userName, email, password });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // Set cookie for 1 hour

        res.status(201).json({ message: "User created successfully", token });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
})

router.post("/login", async (req, res) => { 
    const { userName, email, password } = req.body;

    if (!(userName || email)) {
		res.status(400).json({
			message: "Username or email are required",
		});
    }

    if(!password) {
        res.status(400).json({
            message: "Password is required",
        });
    }

    try {
        const user = await User.findOne({ $or: [{ userName }, { email }] });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        // Here you would typically compare the provided password with the stored hashed password
        // For brevity, this step is omitted in the example
        const isPasswordValid = user.password === password; // Replace with proper password hashing in production
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });
        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

export default router;