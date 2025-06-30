import Order from "../models/orders.model.js";

// Place an order
const placeOrder = async (req, res) => {
  try {
    //fetch order details from request body
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // Validate required fields
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "No order items provided" });
    }

    if (!shippingAddress || !paymentMethod || !itemsPrice || !totalPrice) {
      return res
        .status(400)
        .json({ message: "Missing required order information" });
    }

    // Check for user authentication (in case middleware fails)
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    let orderStatus = "placed";
    let paymentStatus = "pending";
    let isPaid = false;

    // If online payment, set status to pending_payment
    if (paymentMethod === "online") {
      orderStatus = "pending_payment";
    }

    // Create a new order
    const order = await Order.create({
      user: req.user._id,
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
