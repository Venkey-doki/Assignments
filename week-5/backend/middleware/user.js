import jwt from "jsonwebtoken";
// User middleware

const userMiddleware = async (req, res, next) => {
    // Implementation for user middleware

    const jwtToken = req.headers.authorization?.split(" ")[1] || req.cookies?.token;
    if (!jwtToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = decoded.userId; // Assuming the payload contains userId
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
    
};

export default userMiddleware;