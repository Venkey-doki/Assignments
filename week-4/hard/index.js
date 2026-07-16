import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./database/index.js";
import userRoutes from "./routes/user.js";
import todoRoutes from "./routes/todo.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

function requestLogger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next();
}

app.use(requestLogger);
app.get("/healthy", (req, res) => res.send("I am Healthy"));
app.use("/user", userRoutes);
app.use("/todo", todoRoutes);

//  start writing your routes here
const ServerStart = async () => { 
    
    try {
        await connectToDatabase();
		app.listen(port, () =>
			console.log(`server is running at http://localhost:${port}`),
		);
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

ServerStart();
