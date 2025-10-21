const express = require("express");
const router = express.Router();
const multer = require("multer");
const product = require("../models/Products");
const fs = require("fs");
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR); 
  },
  filename: (req, file, cb) => {
    const safeName = Date.now() + "-" + file.originalname.replace(/\s+/g, "-");
    cb(null, safeName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }
    cb(null, true);
  },
});

router.post("/", upload.single("image"), async (req, res) => {
  const { productName, description, price } = req.body;

  if (!productName || !description || !price) {
    return res.status(400).json({ message: "All Fields Required" });
  }

  try {
    const Products = await product.create({
      productName,
      description,
      price,
      image: req.file
        ? path
            .relative(path.join(__dirname, ".."), req.file.path)
            .replace(/\\/g, "/")
        : null, 
    });
    return res
      .status(201)
      .json({ message: "product created successfully", Products });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const getAllProducts = await product.find();
    return res.status(200).json(getAllProducts);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, price } = req.body;

    if (!productName || !description || !price) {
      return res.status(400).json({ message: "All Fields Required" });
    }

    const updateData = { productName, description, price };

    if (req.file) {
      updateData.image = path
        .relative(path.join(__dirname, ".."), req.file.path)
        .replace(/\\/g, "/");
    }
    const updatedProduct = await product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(400).json({ message: "Product not updated" });
    }
    res
      .status(200)
      .json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getProduct = await product.findById(id);
    if (!getProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(getProduct);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
}catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
