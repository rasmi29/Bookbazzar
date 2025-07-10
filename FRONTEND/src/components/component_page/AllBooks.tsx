import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import authState from "../../state/authState";
import { useRecoilValue } from "recoil";

const apiUrl = import.meta.env.VITE_serverURL;

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  coverImage?: string;
  description?: string;
}

const AllBooks: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const auth = useRecoilValue(authState);

  useEffect(() => {
    if (!auth.isLoggedIn) {
      toast.dismiss();
      toast.error("Login required to view book details");
      navigate("/login");
    }
  }, [auth.isLoggedIn, navigate]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${apiUrl}/books`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok) {
          setBooks(data.books || data);
        } else {
          setError(data.message || "Failed to fetch books");
        }
      } catch (err) {
        setError("Error fetching books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleViewBook = (bookId: string) => {
    navigate(`/books/${bookId}`);
  };

  if (loading)
    return <div className="text-center mt-10 text-white">Loading books...</div>;
  if (error)
    return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="min-h-screen m-20 bg-black p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        

        {books.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 text-lg">
            No books found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {books.map((book) => (
              <div
                key={book._id}
                className="group relative bg-gradient-to-br from-gray-900 to-black rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-white/10 transition-all duration-300 transform hover:-translate-y-1 border border-gray-800 hover:border-white/20 h-full"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                <div className="relative p-4 flex flex-col h-full">
                  <div className="relative mb-3 mx-auto">
                    {book.coverImage && (
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-20 h-28 sm:w-24 sm:h-32 object-cover rounded-lg shadow-md transition-all duration-300 transform group-hover:scale-105"
                      />
                    )}

                    <button className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center bg-gray-800/80 text-gray-400 hover:text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 transform hover:scale-110">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>

                  <div className="text-center flex-1 flex flex-col justify-between">
                    <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300 line-clamp-2 mb-1">
                      {book.title}
                    </h3>

                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-2">
                      {book.author}
                    </p>

                    {book.description && (
                      <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors duration-300 line-clamp-2 mb-2">
                        {book.description}
                      </p>
                    )}

                    <div className="text-lg sm:text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300 mb-3">
                      ₹{book.price}
                    </div>

                    <div className="flex space-x-2 w-full">
                      <button
                        onClick={() => handleViewBook(book._id)}
                        className="flex-1 flex items-center justify-center space-x-1 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 text-xs font-medium border border-gray-700 hover:border-gray-600"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        <span>View</span>
                      </button>

                      <button className="flex-1 flex items-center justify-center space-x-1 py-2 bg-white hover:bg-gray-100 text-black rounded-lg transition-all duration-300 transform hover:scale-105 text-xs font-medium">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 5L6 18h15M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"
                          />
                        </svg>
                        <span>Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
