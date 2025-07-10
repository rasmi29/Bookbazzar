import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useRecoilValue } from "recoil";
import authState from "../../state/authState.ts";

const apiUrl = import.meta.env.VITE_serverURL;

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImage?: string;
  description?: string;
  stockQuantity?: number;
  publishedYear?: string;
  pages?: number;
  category?: string;
  isbn?: string;
  rating?: number;
  reviews?: number;
}

const DEFAULT_COVER = "/default-book-cover.png"; // Place a default image in your public folder

const BookDetails: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      toast.dismiss();
      toast.error("Login required to view book details");
      navigate("/login");
    }
  }, [auth.isLoggedIn, navigate]);

  // Skeleton loader for better UX
  const BookSkeleton = () => (
    <div className="animate-pulse flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/3 h-80 bg-gray-800 rounded-xl" />
      <div className="lg:w-2/3 space-y-6">
        <div className="h-10 bg-gray-800 rounded w-2/3" />
        <div className="h-6 bg-gray-700 rounded w-1/3" />
        <div className="h-8 bg-gray-800 rounded w-1/4" />
        <div className="h-24 bg-gray-700 rounded" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="h-16 bg-gray-800 rounded" />
          <div className="h-16 bg-gray-800 rounded" />
        </div>
        <div className="flex gap-4">
          <div className="h-12 w-32 bg-gray-700 rounded" />
          <div className="h-12 w-32 bg-gray-800 rounded" />
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const fetchBook = async () => {
      if (!bookId) {
        setError("Invalid book ID");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiUrl}/books/${bookId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setBook(data.book || data);
        } else {
          setError(data.message || "Failed to fetch book details");
        }
      } catch (err) {
        setError("Error fetching book details");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  // Add to Cart handler (stub)
  const handleAddToCart = () => {
    // TODO: Implement add to cart logic
    alert("Added to cart!");
  };

  // Add to Wishlist handler (stub)
  const handleAddToWishlist = () => {
    // TODO: Implement add to wishlist logic
    alert("Added to wishlist!");
  };

  // Image fallback
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = DEFAULT_COVER;
  };

  // SEO improvement (uncomment if using react-helmet)
  // const pageTitle = book ? `${book.title} | Book Bazaar` : "Book Details | Book Bazaar";

  if (loading)
    return (
      <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <BookSkeleton />
        </div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">
        {error}
        <div>
          <button
            onClick={() => navigate("/allBooks")}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Back to Books
          </button>
        </div>
      </div>
    );
  if (!book)
    return (
      <div className="text-center text-gray-400 mt-10">
        Book not found
        <div>
          <button
            onClick={() => navigate("/allBooks")}
            className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
          >
            Back to Books
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6 lg:p-8 mt-20">
      {/* <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={book.description?.slice(0, 150) || "Book details"} />
      </Helmet> */}
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/allBooks")}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-200 mb-6"
          aria-label="Back to Books"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Back to Books</span>
        </button>

        {/* Book Details */}
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 sm:p-8 border border-gray-800">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Book Cover */}
            <div className="lg:w-1/3">
              <img
                src={book.coverImage || DEFAULT_COVER}
                alt={book.title}
                onError={handleImgError}
                className="w-full max-w-md mx-auto rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Book Information */}
            <div className="lg:w-2/3 space-y-6">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                  {book.title}
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 mb-4">
                  by {book.author}
                </p>
              </div>

              {/* Rating */}
              {book.rating != null && (
                <div className="flex items-center space-x-3">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 ${
                          i < Math.round(book.rating!)
                            ? "fill-current"
                            : "text-gray-600"
                        }`}
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white text-lg">{book.rating}</span>
                  {book.reviews != null && (
                    <span className="text-gray-400">
                      ({book.reviews} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="text-4xl sm:text-5xl font-bold text-green-400">
                ₹{book.price}
              </div>

              {/* Description */}
              {book.description && (
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Description
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {book.description}
                  </p>
                </div>
              )}

              {/* Additional Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {book.category && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">Category</span>
                    <p className="text-white font-semibold">{book.category}</p>
                  </div>
                )}
                {book.publishedYear && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">Published</span>
                    <p className="text-white font-semibold">
                      {book.publishedYear}
                    </p>
                  </div>
                )}
                {book.isbn && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">ISBN</span>
                    <p className="text-white font-semibold">{book.isbn}</p>
                  </div>
                )}
                {book.stockQuantity != null && (
                  <div className="bg-gray-800/50 p-4 rounded-lg">
                    <span className="text-gray-400 text-sm">
                      Quantity Available
                    </span>
                    <p className="text-white font-semibold">
                      {book.stockQuantity}
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 bg-white hover:bg-gray-100 text-black py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  onClick={handleAddToCart}
                  aria-label="Add to Cart"
                >
                  Add to Cart
                </button>
                <button
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 border border-gray-600 shadow-lg"
                  onClick={handleAddToWishlist}
                  aria-label="Add to Wishlist"
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
