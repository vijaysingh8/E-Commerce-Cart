import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

// ✅ Get Cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.find().populate("productId");

    // ✅ Remove corrupted items automatically
    for (let item of cart) {
      if (!item.productId) {
        await Cart.findByIdAndDelete(item._id);
      }
    }

    // reload clean cart
    cart = await Cart.find().populate("productId");

    const total = cart.reduce((sum, item) => {
      if (!item.productId) return sum;
      return sum + item.productId.price * item.qty;
    }, 0);

    res.json({ cart, total });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Add to Cart (increase or decrease qty)
export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid productId",
      });
    }

    
    let existing = await Cart.findOne({ productId });

    if (existing) {
     
      existing.qty += qty;

     
      if (existing.qty <= 0) {
        await Cart.findByIdAndDelete(existing._id);
        return res.json({ success: true, message: "Item removed" });
      }

      await existing.save();
      return res.json({ success: true, item: existing });
    }

    
    const newItem = await Cart.create({ productId, qty });

    res.status(200).json({
      success: true,
      item: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


export const deleteFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    // productId must be provided
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "productId is required",
      });
    }

    // Validate productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid productId",
      });
    }

    // ✅ Find existing cart item
    let existing = await Cart.findOne({ productId });

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // ✅ Decrease quantity
    existing.qty -= 1;

    // ✅ If quantity reaches 0 → delete item
    if (existing.qty <= 0) {
      await Cart.findByIdAndDelete(existing._id);
      return res.json({
        success: true,
        message: "Item removed from cart",
      });
    }

    // ✅ Save updated quantity
    await existing.save();

    res.json({
      success: true,
      message: "Item quantity decreased",
      item: existing,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
