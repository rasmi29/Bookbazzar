import express from "express";
import jwtAuth from "../middlewares/jwt_auth.middleware.js";
import { createPayment, verifyPayment } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

// Create a fake Razorpay payment ID
paymentRouter.post("/create",jwtAuth, createPayment);

//Verify mock payment
paymentRouter.post("/verify", jwtAuth, verifyPayment);

export default paymentRouter;