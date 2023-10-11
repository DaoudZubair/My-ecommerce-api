import Product from "../models/product.model.js";
import Cart from "../models/cart.model.js";
import User from "../models/user.model.js";

// Create Cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity, totalPrice, totalCartPrice } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ userId });

  const existingProduct = cart.items.find((item) => item.productId.toString() === productId);

  if (existingProduct) {
    existingProduct.quantity = quantity;
    existingProduct.totalPrice = totalPrice;
  } else {
    cart.items.push({ productId, quantity, totalPrice, totalCartPrice });
  }

  cart.totalCartPrice = totalCartPrice;

  await cart.save();
  return res.status(200).json(cart);
};

export const createCart = async (req, res) => {
  const { userId } = req.params;

  let user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User doesn't exist." });
  }

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  await cart.save();
  return res.status(200).json(cart);
};

export const deleteCart = async (req, res) => {
  const { productId } = req.params;
  const { userId, totalCartPrice } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) {
    return res.status(404).json({ message: "User's cart doesn't exist" });
  }

  const productIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

  if (productIndex === -1) {
    return res.status(404).json({ message: "No Product in the cart" });
  }

  cart.items.splice(productIndex, 1);
  cart.totalCartPrice = totalCartPrice;

  await cart.save();
  return res.status(200).json(cart);
};

export const getCart = async (req, res) => {
  const { userId } = req.body;
  let page = req.query.page;
  let pageLimit = req.query.limit;
  const cart = await Cart.findOne({ userId })
    .populate("userId", "username email firstname lastname")
    .populate("items.productId", "title price productPicUrl")
    .skip((page - 1) * pageLimit)
    .limit(pageLimit);

  if (!cart) {
    return res.status(404).json({ message: "User's cart doesn't exist" });
  } else {
    return res.status(200).json(cart);
  }
};
