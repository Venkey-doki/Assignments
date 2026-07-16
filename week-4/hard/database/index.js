import mongoose from "mongoose";

// Connect to MongoDB
export const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb://root:example@localhost:27017/todoApp?authSource=admin", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};
// Define schemas

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }

});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: {type: Date, default:Date.now }    
});

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);


export { User, Todo };