const User = require('../models/Signup')
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

// Get all users
router.get('/',  async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.post('/', async (req,res) => {
    try {
        const {username,email,password} = req.body
        if (!username || !email || !password) {
            res.status(400).json({message: "All fields required"})
        }

        // Checking if user already exist 
        const user = await User.findOne({email})
        if(user){
            res.status(401).json({message: "User Already exits"})
        }
        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ username, email, password:hashedPassword})
        await newUser.save()

        res.status(200).json({message: "Account created successfully",user:newUser})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error"})
    }
})


module.exports = router