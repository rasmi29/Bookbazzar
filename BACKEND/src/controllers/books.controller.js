import Book from "../models/books.model.js";
import { Review } from "../models/reviews.model.js";

//add book
const addBook = async (req, res) => {
  //admin middlearwe is already there to check admin or not next step
  try {
    //fetch all the data from request body
    const {
      title,
      author,
      description,
      price,
      publishedYear,
      category,
      isbn,
      stockQuantity,
      coverImage,
    } = req.body;

    //validate all data
    if (
      !title ||
      !author ||
      !price ||
      !isbn ||
      !description ||
      !publishedYear ||
      !category ||
      !stockQuantity ||
      !coverImage
    ) {
      return res.status(404).json({
        message: "all  fields are required",
        success: false,
      });
    }

    //create a book object
    const book = {
      title,
      author,
      description,
      price,
      publishedYear,
      category,
      isbn,
      stockQuantity,
      coverImage,
    };

    //save book to database
    const newBook = await Book.create(book);

    return res.status(201).json({
      message: "book added successfully",
      success: true,
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error while adding book",
      success: false,
    });
  }
};

//get all books
const getAllBooks = async (req, res) => {
  try {
    //fetch books
    const books = await Book.find({}).sort({ createdAt: -1 });
    //if no books found
    if (books.length === 0) {
      return res.status(404).json({
        message: "No books found",
        success: false,
      });
    }
    //return books
    return res.status(200).json({
      message: "Books fetched successfully",
      success: true,
      books: books,
    });
  } catch (error) {
    return res.status(500).json({                      
      message: "Server error while fetching books",
      success: false,
    });
  }
};

//get book details
const getBookDetails = async (req, res) => {
  try {
    //fetch id
    const { id } = req.params;
    //find book by id
    const book = await Book.findById(id);
    //if book not found
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }
    //return book details
    return res.status(200).json({
      message: "Book details fetched successfully",
      success: true,
      book: book,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching book details",
      success: false,
    });
  }
};

//update book details
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate all required fields
    const requiredFields = [
      "title", "author", "description", "price", "publishedYear",
      "category", "isbn", "stockQuantity", "coverImage"
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({
          message: `${field} is required`,
          success: false,
        });
      }
    }

    // Update book details
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    // If book not found
    if (!updatedBook) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }
    // Return updated book details
    return res.status(200).json({
      message: "Book updated successfully",
      success: true,
      book: updatedBook,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while updating book",
      success: false,
    });
  }
};

//delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    //find book by id
    const book = await Book.findByIdAndDelete(id);
    //if book not found
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }
    //return success message
    return res.status(200).json({
      message: "Book deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while deleting book",
      success: false,
    });
  }
}

//post review to a book
const addReviewToBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { user, rating, comment } = req.body;

    if (!user || !rating || !comment) {
      return res.status(400).json({
        message: "User, rating, and comment are required",
        success: false,
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    const newReview = await Review.create({
      book: bookId,
      user,
      rating,
      comment,
    });

    // Update book's ratings
    const reviews = await Review.find({ book: bookId });
    const count = reviews.length;
    const average = reviews.reduce((acc, r) => acc + r.rating, 0) / count;

    book.ratings.average = average;
    book.ratings.count = count;
    await book.save();

    return res.status(201).json({
      message: "Review added successfully",
      success: true,
      review: newReview,
    });

    
  } catch (error) {
    return res.status(500).json({
      message: "Server error while adding review",
      success: false,
      error: error.message
    });
  }
}

//get reviews for a book
const getReviewsForBook = async (req, res) => {
  try {
    //fetch book id
    const { bookId } = req.params;

    const reviews = await Review.find({ book: bookId });
    if (!reviews) {
      return res.status(404).json({
        message: "No reviews found for this book",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Reviews fetched successfully",
      success: true,
      reviews: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while fetching reviews",
      success: false,
    });
  }
}

export { addBook, getAllBooks, getBookDetails, updateBook, deleteBook , addReviewToBook , getReviewsForBook };
