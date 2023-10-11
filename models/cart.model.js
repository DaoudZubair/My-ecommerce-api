import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{
    productId:  { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
    quantity:   { type: Number, default: 1, min:1, max: 10 },
    totalPrice: { type: Number, required: true }
  }],
  totalCartPrice: { type: Number, required: true },

  createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
