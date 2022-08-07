import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

// const jwt = require('jsonwebtoken')

import jwt from 'jsonwebtoken'
import User from './models/user.model.js'
import Note from './models/note.model.js'
import noteRoutes from './routes/notes.js'
import userRoutes from './routes/users.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/notes', noteRoutes)
app.use('/users', userRoutes)

const CONNECTION_URL = 'mongodb+srv://amin:qwerty1029384756@cluster0.qnehnrn.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 8000

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => {
        console.log("Successfully connected to database!")
        console.log("Started on: http://localhost:8000/")
    }))
    .catch(() => console.log("Databse connection failed"))


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


