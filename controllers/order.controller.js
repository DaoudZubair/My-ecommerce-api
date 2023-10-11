import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";

// Create Order
export const createOrder = async (req, res) => {
  const { userId, cartId, totalOrderPrice, shippingAddress, paymentMethod, transactionId } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User doesn't exist." });
  }

  const cart = await Cart.findById(cartId);
  if (!cart) {
    return res.status(404).json({ message: "Cart not found." });
  }

  const order = new Order({
    userId,
    cartId,
    totalOrderPrice,
    shippingAddress,
    paymentMethod,
    transactionId,
  });

  await order.save();

  return order;
};

// Update Order Status
export const updateOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found." });
  }

  if (!["pending", "shipped", "completed", "cancelled"].includes(orderStatus)) {
    return res.status(400).json({ message: "Invalid order status." });
  }

  order.orderStatus = orderStatus;

  await order.save();

  return order;
};

// Get Orders
export const getOrders = async (req, res) => {
  const { userId } = req.params;

  const orders = await Order.find({ userId })
    .populate("userId", "username email firstname lastname")
    .populate("cartId", "items")
    .exec();

  return orders;
};
