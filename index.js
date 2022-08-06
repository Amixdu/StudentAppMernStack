require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/internship-assignment')

app.post('/api/create', async (req, res) => {
    console.log(req.body)
    try{
        const user = await User.create({
            email: req.body.email
        })
        res.json({ status: 'success' })
        // res.send(user)
    } 
    catch{
        res.json({ status: 'error' })
    }
})



app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    

    if (user) {
        console.log("YES")
        const token = jwt.sign({
            email: req.body.email
        }, process.env.ACCESS_TOKEN)

        return res.json({ status: 'success', user: token})
    }
    else{
        console.log("NO")
        return res.json({ status: 'error' })
    }
    
})



app.listen(8000, () => {
    console.log("Started on: http://localhost:8000/")
})