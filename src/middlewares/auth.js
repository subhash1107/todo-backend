import { verifyToken } from "../utils/jwt.js";
import { User } from "../models/User.js";

// Check if User is authenticated and attach the user object to the request object

export const auth = async (req, res, next) => {
  try {
    // Authentication token
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }
    
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).select("firstName lastName email _id");;
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // After authenticating the user attach the found user to req header
     req.user = user
    
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
