import express from "express";
import jwtAuth from "../middlewares/jwt_auth.middleware.js";
import { getAllOrders, getOrderDetails, listOrders, placeOrder } from "../controllers/order.controller.js";
import { adminCheck } from "../middlewares/admin_check.middleware.js";

const orderRouter = express.Router();

//place an order
orderRouter.post("/",jwtAuth , placeOrder);

//list all orders of a user
orderRouter.get("/",jwtAuth, listOrders);

//list all orders of all users(admin only)
orderRouter.get("/admin", jwtAuth, adminCheck,getAllOrders );

//get order details
orderRouter.get("/:id",jwtAuth,getOrderDetails );


export default orderRouter;