import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title of book is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    author: {
        type: String,
        required: [true, 'Author is required'],
        trim: true,
        maxlength: [50, 'Author name cannot exceed 50 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Price cannot be negative']
    },
    publishedYear: {
        type: Number,
        min: [1000, 'Year must be a valid 4-digit year'],
        max: [new Date().getFullYear(), 'Year cannot be in the future']
    },
    category: {
        type: String,
        enum: {
            values: [
                'Fiction', 'Non-Fiction', 'Science Fiction', 
                'Fantasy', 'Mystery', 'Romance', 'Biography', 
                'History', 'Self-Help', 'Other'
            ],
            message: '{VALUE} is not a valid category'
        },
        default: 'Other'
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true,
        validate: {
            validator: function(v) {
                return /^(?:\d{10}|\d{13})$/.test(v);
            },
            message: 'ISBN must be 10 or 13 digits'
        }
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative'],
        default: 0
    },
    publisher: {
        type: String,
        trim: true
    },
    coverImage: {
        type: String,
        default: 'default-cover.jpg'
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    isPopular:{
        type: Boolean,
        default: false
    },
    isNewArrival: {
        type: Boolean,
        default: false
    },
    ratings: {
        average: {
            type: Number,
            min: [0, 'Rating cannot be less than 0'],
            max: [5, 'Rating cannot exceed 5'],
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    pdfLink:{
        type:String,
        
    }
    
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);

export default Book;

