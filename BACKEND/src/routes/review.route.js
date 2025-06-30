import express from "express";
import jwtAuth from "../middlewares/jwt_auth.middleware.js";
import deleteReview from "../controllers/review.controller.js";

const reviewRouter = express.Router();


//delete a review
reviewRouter.delete("/:id",jwtAuth,  deleteReview);


export default reviewRouter;