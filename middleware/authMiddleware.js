const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust path based on your structure

const protectRoute = async (req, res, next) => {
    try {
        // Check for Authorization header and extract token
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Unauthorized: No token provided" });
        }
        
        const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch user and exclude password from response
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
        }

        // Attach user to request object for further route handling
        req.user = user;
        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        
        // Handle token expiration separately for better UX
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Session expired. Please log in again." });
        }

        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" });
    }
};

module.exports = protectRoute;
