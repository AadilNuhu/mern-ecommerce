const express = require('express')
const app = express()
const cors = require('cors')
const connectDB = require('./config')
require('dotenv').config()
connectDB()

const port = process.env.PORT

app.use(express.json())
app.use(cors())
app.use('/uploads', express.static('uploads'))

app.use('/login', require('./routes/Login'))
app.use('/signup',require('./routes/Signup'))

app.use('/products',require('./routes/Products'))

app.get('/', (req,res) => {
    res.send('Homepage')
})




app.listen(port , () => {
    console.log(`Server running on ${port}`);
} )