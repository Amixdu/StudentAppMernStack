import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import noteRoutes from './routes/notes.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const CONNECTION_URL = process.env.MONGO_STRING
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

app.use('/notes', noteRoutes)
app.use('/users', userRoutes)

app.get('/', (req, res) => {
    return res.send('Server Is Running!')
})

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => {
        console.log("Successfully connected to database!")
        console.log("Started on: http://localhost:8000/")
    }))
    .catch((err) => console.log(err))