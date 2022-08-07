import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

// const jwt = require('jsonwebtoken')

import jwt from 'jsonwebtoken'
import User from './models/user.model.js'
import noteRoutes from './routes/notes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/notes', noteRoutes)

const CONNECTION_URL = 'mongodb+srv://amin:qwerty1029384756@cluster0.qnehnrn.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8000

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => {
        console.log("Successfully connected to database!")
        console.log("Started on: http://localhost:8000/")
    }))
    .catch(() => console.log("Databse connection failed"))



app.post('/api/create', async (req, res) => {
    console.log(req.body)
    try{
        const user = await User.create({
            id: 1,
            firstName: 'Test',
            lastName:'TestLast',
            email: req.body.email,
            dateOfBirth: new Date('December 17, 1995 03:24:00'),
            mobile: 12345,
            status: false,
            password: 'password',
            accountType: 'testType'
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


app.get('/api/notes', async (req, res) => {
    const token = req.headers['x-access-token']

    try{
        const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN)
        const email = decodedData.email
        const user = await User.findOne({ email: email })
        return res.json({ status: 'ok', notes: user.notes })
    }
    catch(error){
        return res.json({ status: 'error' })

    }  
})

// app.post('/api/add-notes', async (req, res) => {
//     const token = req.headers['x-access-token']

//     try{
//         const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN)
//         const email = decodedData.email
//         await User.updateOne({ email: email }, { $set: { notes:req.body.quote }})
//         return res.json({ status: 'ok' })
//     }
//     catch(error){
//         return res.json({ status: 'error' })
//     }  
// })


// app.post('/api/notes', async (req, res) => {
//     const token = req.headers['x-access-token']

//     try{
//         const decodedData = jwt.verify(token, process.env.ACCESS_TOKEN)
//         const email = decodedData.email
//         await User.updateOne({ email: email }, { $set: { notes:req.body.quote }})
//         return res.json({ status: 'ok' })
//     }
//     catch(error){
//         return res.json({ status: 'error' })
//     }  
// })


