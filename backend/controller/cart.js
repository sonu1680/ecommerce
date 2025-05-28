import { CartScehma } from "../db_schema/cartSchema.js";

export const addCart=async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let item = await CartScehma.findOne({ userId, productId });
    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await CartItem.create({ userId, productId, quantity });
    }
    res.json({ message: "Item added to cart", cartItem: item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove from cart
export const removeCart =async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const result = await CartScehma.deleteOne({ userId, productId });
    res.json({ message: "Item removed from cart", result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get cart for a user
export const getCart = async (req, res) => {
  try {
    const cart = await CartScehma.find({ userId: req.params.userId });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
