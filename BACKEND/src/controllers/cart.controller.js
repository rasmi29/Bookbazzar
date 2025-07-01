import { CartItem } from "../models/cart_items.model.js";
import Book from "../models/books.model.js";
import User from "../models/users.model.js";

//Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { book, quantity = 1 } = req.body;
    const userId = req.user._id;

    // Check if CartItem already exists for this user and book
    let cartItem = await CartItem.findOne({ user: userId, book });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // Create new cart item
      cartItem = await CartItem.create({ user: userId, book, quantity });

      // Add reference to user's cart array
      await User.findByIdAndUpdate(userId, {
        $push: { cart: cartItem._id },
      });
    }

    res.status(200).json({
      success: true,
      message: "Book added to cart successfully",
      data: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add to cart",
      error: error.message,
    });
  }
};

//Get all cart items for a user
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate({
        path: "cart",
        populate: { path: "book" }
      })
      .lean();

    if (!user || user.cart.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: user.cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
};
//Update cart item quantity
export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params; // cartItem ID
    const { quantity } = req.body;

    const cartItem = await CartItem.findOneAndUpdate(
      { _id: id, user: userId },
      { quantity },
      { new: true }
    ).populate("book");

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Cart item updated successfully",
      data: cartItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update cart item",
      error: error.message,
    });
  }
};
// Remove item from cart
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id } = req.params; // cartItem ID

    const cartItem = await CartItem.findOneAndDelete({ _id: id, user: userId });

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Remove cartItem reference from user's cart array
    await User.findByIdAndUpdate(userId, {
      $pull: { cart: id },
    });

    res.status(200).json({
      success: true,
      message: "Cart item removed successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove cart item",
      error: error.message,
    });
  }
};
