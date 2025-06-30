import express from "express";
import jwtAuth from "../middlewares/jwt_auth.middleware.js";
import { adminCheck } from "../middlewares/admin_check.middleware.js";
import { addBook, addReviewToBook, deleteBook, getAllBooks, getBookDetails, getReviewsForBook, updateBook } from "../controllers/books.controller.js";

const bookRouter = express.Router();

// Add a book (Admin only)
bookRouter.post("/",jwtAuth, adminCheck, addBook);

// List all books (public, supports filters)
bookRouter.get("/", getAllBooks);

//get books details
bookRouter.get("/:id",jwtAuth,getBookDetails);

//update book details (Admin only)
bookRouter.put("/:id",jwtAuth,adminCheck, updateBook);

//delete book (Admin only)
bookRouter.delete("/:id",jwtAuth,adminCheck, deleteBook);

//add review to a book
bookRouter.post("/:bookId/reviews",jwtAuth, addReviewToBook);

//list reviews of a book
bookRouter.get("/:bookId/reviews", jwtAuth, getReviewsForBook);



export default bookRouter;