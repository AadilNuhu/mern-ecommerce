// routes/cart.js
const express = require("express")
const router = express.Router()
const Cart = require("../models/Cart")
const Product = require("../models/Products")

// GET cart items for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    const carts = await Cart.find({ userId }).populate("productId")
    res.json(carts)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch cart items" })
  }
})

// POST add product to user's cart
router.post("/", async (req, res) => {
  try {
    const { userId, productId } = req.body

    if (!userId || !productId) {
      return res.status(400).json({ message: "userId and productId are required" })
    }

    const product = await Product.findById(productId)
    if (!product) return res.status(404).json({ message: "Product not found" })

    // Check if item already exists for this user
    let cartItem = await Cart.findOne({ userId, productId })
    if (cartItem) {
      cartItem.quantity += 1
      await cartItem.save()
      return res.json({ message: "Quantity updated", cartItem })
    }

    // Add new item
    cartItem = await Cart.create({ userId, productId })
    res.status(201).json({ message: "Product added to cart", cartItem })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to add to cart" })
  }
})

// DELETE a single cart item for a user
router.delete("/:userId/:itemId", async (req, res) => {
  try {
    const { userId, itemId } = req.params
    const deleted = await Cart.findOneAndDelete({ _id: itemId, userId })
    if (!deleted) return res.status(404).json({ message: "Cart item not found" })
    res.json({ message: "Cart item removed" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to remove cart item" })
  }
})

// CLEAR entire user's cart
router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params
    await Cart.deleteMany({ userId })
    res.json({ message: "User's cart cleared" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to clear cart" })
  }
})

module.exports = router