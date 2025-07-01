import express from "express";
import jwtAuth from "../middlewares/jwt_auth.middleware.js";
import { addToCart, getCart, removeFromCart, updateCartItem } from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/", jwtAuth, addToCart);
cartRouter.get("/", jwtAuth, getCart);
cartRouter.put("/", jwtAuth, updateCartItem);
cartRouter.delete("/", jwtAuth, removeFromCart);

export default cartRouter;