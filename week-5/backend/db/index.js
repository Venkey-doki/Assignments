// DB connection Mongodb
import mongoose, { Schema } from "mongoose";

const connectDB = async () => { 
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

//Schemas

//user Schema
const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//todos Schema
const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

export { connectDB, User, Todo };