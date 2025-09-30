const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    productName: {type:String, required:true},
    description: {type:String, required:true},
    price: {type:String, required:true},
    image : String
})

module.exports = mongoose.model('product',ProductSchema)