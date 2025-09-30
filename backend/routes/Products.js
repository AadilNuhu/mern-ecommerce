const express = require('express')
const router = express.Router()
const multer = require('multer')
const product = require('../models/Products')
const fs = require('fs')
const path = require('path')

// ensure uploads directory exists
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true })
}

// multer set up: save into backend/uploads with a timestamped filename
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_DIR) // images stored in backend/uploads
    },
    filename: (req, file, cb) => {
        const safeName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-')
        cb(null, safeName)
    }
})

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // only accept common image mimetypes
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'))
    }
    cb(null, true)
  }
})

// Creating Products (multipart/form-data)
router.post('/', upload.single('image'), async (req,res) => {
    const {productName,description,price} = req.body

    if (!productName || !description || !price) {
        return res.status(400).json({message: "All Fields Required"})
    }

    try {
        const Products = await product.create({
            productName,
            description,
            price,
            image: req.file ? path.relative(path.join(__dirname, '..'), req.file.path).replace(/\\/g, '/') : null // store relative path like uploads/filename
        })
        return res.status(201).json({message : "product created successfully", Products})
        
    } catch (err) {
        console.error(err)
        return res.status(500).json({message: "Server error"})
    }
})

// Get all products 
router.get('/', async (req,res) => {
    try {
      const getAllProducts = await product.find()
      return res.status(200).json(getAllProducts)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
})

module.exports = router