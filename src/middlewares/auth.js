import { verifyToken } from "../utils/jwt.js";
import { User } from "../models/User.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).select("firstName lastName email _id");;
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    console.log("auth.js "+user);
    

    req.user = user

    console.log("auth.js "+req.user);
    
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
