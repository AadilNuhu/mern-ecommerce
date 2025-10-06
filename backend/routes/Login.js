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
        const Email = await User.findOne({email})
        if (!Email) {
            return res.status(401).json({message:`Invalid Credentials`})
        }
        // compare password
        const Password = await bcrypt.compare(password, Email.password)
        if(!Password){
            return res.status(401).json({message: "Invalid Credentials"})
        }
        const user = { id:Email._id, email:Email.email, username:Email.username }
        return res.status(200).json({message:"Login Successful", user})

    } catch (error) {
        console.log(error);
        return res.status(404).json({error:"server error"})
    }
})

module.exports = router