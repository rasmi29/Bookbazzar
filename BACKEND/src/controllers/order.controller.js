import Order from "../models/orders.model.js";
import User from "../models/users.model.js";
import { CartItem } from "../models/cart_items.model.js";

// Place an order (pulling from user's cart)
const placeOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Fetch user with populated cart
    const user = await User.findById(userId).populate({
      path: "cart",
      populate: {
        path: "book",
        select: "title price",
      },
    });

    if (!user || user.cart.length === 0) {
      return res.status(400).json({
        message: "Cart is empty. Cannot place order.",
        success: false,
      });
    }

    // 2. Build order items
    const orderItems = user.cart.map((item) => ({
      book: item.book._id,
      quantity: item.quantity,
      price: item.book.price,
    }));

    // 3. Calculate pricing
    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const shippingPrice = itemsPrice > 500 ? 0 : 40;
    const totalPrice = itemsPrice + shippingPrice;

    // 4. Optional: get shipping & payment method from body
    const { shippingAddress, paymentMethod } = req.body;

    if (!shippingAddress || !paymentMethod) {
      return res.status(400).json({
        message: "Shipping address and payment method are required",
        success: false,
      });
    }

    // 5. Define order status
    let orderStatus = "placed";
    let paymentStatus = "pending";
    let isPaid = false;

    if (paymentMethod === "online") {
      orderStatus = "pending_payment";
    }

    // 6. Create order
    const order = await Order.create({
      user: userId,
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      orderStatus,
      paymentStatus,
    });

    // 7. Clear user's cart
    await CartItem.deleteMany({ user: userId });
    user.cart = [];
    await user.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error placing order",
      error: error.message,
      success: false,
    });
  }
};


//list all orders
const listOrders = async (req, res) => {
  try {
    // Fetch all orders for the authenticated user
    const orders = await Order.find({ user: req.user._id })
      .populate("user", "name email")
      .populate("orderItems.book", "title author price");
    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching orders",
      error: error.message,
      success: false,
    });
  }
};

//list all orders of all users(admin only)
const getAllOrders = async (req, res) => {
  try {
    // Fetch all orders for admin
    const orders = await Order.find({})
      .populate("user", "name email")
      .populate("orderItems.book", "title author price");

    return res.status(200).json({
      message: "All orders fetched successfully",
      orders,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching all orders",
      error: error.message,
      success: false,
    });
  }
};

//get order details
const getOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;
    // Validate order ID
    if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required",
        success: false,
      });
    }
    // Fetch order details
    const order = await Order.findById(orderId)
      .populate("user", "name email")
      .populate("orderItems.book", "title author price");
    // Check if order not found
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "Order details fetched successfully",
      order,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching order details",
      error: error.message,
      success: false,
    });
  }
};
export { placeOrder, listOrders, getAllOrders, getOrderDetails };
