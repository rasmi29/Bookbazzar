import express from "express";
import { getUser, loginUser, logoutUser, registerUser, verifyUser } from "../controllers/auth.controller.js";
import jwtAuth from "../middlewares/jwt_auth.middleware.js";

const authRouter = express.Router();

// generate a new API key
// authRouter.post("/api-key", /* controller.createApiKey */);

//regsister user
authRouter.post("/register",registerUser);

//login user
authRouter.post("/login", loginUser);

// verify user 
authRouter.get("/verify", verifyUser);

// get profile 
authRouter.get("/me",jwtAuth, getUser);

//logout user
authRouter.post("/logout",jwtAuth, logoutUser);

export default authRouter;