import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import Note from '../models/note.model.js'

export const getNotes = async (req, res) => {
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
}

export const addNotes = async (req, res) => {
    const token = req.headers['x-access-token']

    try{
        const user = jwt.verify(token, process.env.ACCESS_TOKEN)
        const email = user.email
        await Note.create({ 
            email: email, 
            title: req.body.title, 
            description: req.body.description 
        })
        console.log('Note Added')
        return res.json({ status: 'ok' })
    }
    catch(error){
        console.log(error)
        return res.json({ status: 'error' })
    }
}

