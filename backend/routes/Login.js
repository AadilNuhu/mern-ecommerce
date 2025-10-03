const User = require('../models/Signup')
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

router.post('/', async (req,res) => {
    const {email,password} = req.body
    
    if(!email || !password) {
        return res.status(400).json({message: "All Fields Required"})
    }
    try {
        // Check if user exist
        const emailExist = await User.findOne({email})
        if (!emailExist) {
            return res.status(400).json({message:`Email doesn't exist`})
        }
        // compare password
        const validPassword = await bcrypt.compare(password, emailExist.password)
        if(!validPassword){
            return res.status(400).json({message: "Wrong Password"})
        }
        const user = { id:emailExist._id, email:emailExist.email, username:emailExist.username }
        return res.status(200).json({message:"Login Successful", user})

    } catch (error) {
        console.log(error);
        return res.status(400).json({error:"server error"})
    }
})

module.exports = router