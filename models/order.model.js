import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users" 
  },

  cartId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "carts" 
  },

  totalOrderPrice: { 
    type: Number, 
    min: 0 
  },

  orderDate: { 
    type: Date, 
    default: Date.now 
  },

  shippingAddress: {
    street:      {type: String},
    city:        {type: String},
    postalCode:  {type: String},
    country:     {type: String}
  },

  paymentMethod: {
    type: String,
  },

  transactionId: {
    type: String,
  },

  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "completed", "cancelled"],
    default: "pending"
  }
});

const Order = mongoose.model("Order", orderSchema);
export default Order;