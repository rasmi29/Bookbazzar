import jwt from "jsonwebtoken";
import  User  from "../models/users.model.js";

async function jwtAuth(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided, authorization denied! Please login again."
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}

export default jwtAuth;