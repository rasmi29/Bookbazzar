import { Review } from "../models/reviews.model.js";
import User from "../models/users.model.js";
import Book from "../models/books.model.js";

const deleteReview = async (req, res) => {
  const { id } = req.params;

  // Fetch the review
  const review = await Review.findById(id);
  if (!review) {
    return res.status(404).json({
      message: "Review not found",
      success: false,
    });
  }
  const bookId = review.book;

  // Find the user who is trying to delete the review
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(404).json({
      message: "Author not found",
      success: false,
    });
  }

  // Check if user is the author of the review
  if (review.user.toString() !== user._id.toString()) {
    return res.status(403).json({
      message: "You are not authorized to delete this review",
      success: false,
    });
  }

  // Delete review
  await Review.findByIdAndDelete(id);

  // Update the book's ratings
  const book = await Book.findById(bookId);
  if (book) {
    const reviews = await Review.find({ book: bookId });
    const totalRatings = reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = reviews.length ? totalRatings / reviews.length : 0;
    book.ratings.average = averageRating;
    book.ratings.count = reviews.length;
    await book.save();
  }

  return res.status(200).json({
    message: "Review deleted successfully",
    success: true,
  });
};

export default deleteReview ;