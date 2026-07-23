//entry point of the application
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";
import cookieParser from "cookie-parser";
//routes
import userRoutes from "./routes/user.js";
import todoRoutes from "./routes/todo.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/todo", todoRoutes);
app.use("/user", userRoutes);

app.get("/health", (req, res) => {
    res.send("Server is running!");
});


(
    async () => {
        try {
            await connectDB();
            app.listen(process.env.PORT, () => {
                console.log(`Server is running on port http://localhost:${process.env.PORT}`);
            });
        } catch (error) {
            console.error("Error starting the server:", error);
        }
    }
)();