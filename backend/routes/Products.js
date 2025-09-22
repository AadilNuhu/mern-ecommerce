const express = require('express')
const router = express.Router()
const product = require('../models/Products')

// Creating Products
router.post('/', async (req,res) => {
    const {productName,description,price} = req.body

    if (!productName || !description || !price) {
        res.status(400).json({message: "All Fields Required"})
    }

    try {
        const Products = await product.create({
            productName,
            description,
            price
        })
        res.status(200).json({message : "product created successfully",Products})
        
    } catch (err) {
        res.status(404).json({message: err})
    }
})

// Get all products 
router.get('/', async (req,res) => {
    const getAllPproducts = await product.find()
    res.status(201).json(getAllPproducts)
})

// Get a product by id

// update product

// delete product

module.exports = router