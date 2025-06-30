import Payment from "../models/payment.model.js";
import razorpayInstance from "../utils/razorpayInstance.js";
import Book from "../models/books.model.js";
import Order from "../models/orders.model.js";
import crypto from "crypto";

const createPayment = async (req, res) => {
  try {
    const { orderId,paymentMethod } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order items and payment method are required",
      });
    }

    let amount = 0;
    for (const item of order.orderItems) {
      const book = await Book.findById(item.book);
      if (!book) {
        return res
          .status(404)
          .json({ success: false, message: "Book not found" });
      }
      amount += book.price * item.quantity;
    }

    const amountInPaise = amount * 100;

    const paymentOrder = await razorpayInstance.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: "order_rcptid_" + Date.now(),
      payment_capture: 1,
    });

    // Save payment record with Razorpay order ID
    await Payment.create({
      user: req.user.id,
      order: orderId,
      amount,
      paymentMethod,
      transactionId: paymentOrder.id,
      paymentStatus: "pending",
    });

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: paymentOrder,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while creating payment",
      error: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !orderId
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification details",
      });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const isAuthentic = generatedSignature === razorpay_signature;

    if (!isAuthentic) {
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "failed",
        orderStatus: "cancelled",
      });

      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    // Payment successful
    await Order.findByIdAndUpdate(orderId, {
      isPaid: true,
      paymentStatus: "completed",
      orderStatus: "placed",
      paidAt: new Date()
    });

    res.status(200).json({
      success: true,
      message: "Payment verified and order placed",
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while verifying payment",
      error: error.message,
    });
  }
};

export { createPayment, verifyPayment };
