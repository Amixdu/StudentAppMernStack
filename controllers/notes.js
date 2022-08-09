import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
import Note from '../models/note.model.js'

export const getNotes = async (req, res) => {
    const PAGE_SIZE = 3
    const page = parseInt(req.query.page || "0")
    const token = req.headers['x-access-token']
    try{
        const user = jwt.verify(token, process.env.ACCESS_TOKEN)
        const email = user.email
        const totalNotes = await Note.countDocuments({email: email })
        const totalPages = Math.ceil((totalNotes / PAGE_SIZE))
        const data = await Note.find({ email: email }).limit(PAGE_SIZE).skip(PAGE_SIZE * page)
        // console.log(data)
        return res.json({ status: 'ok', notes: data, totalPages:totalPages })
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

export const updateNotes = async (req, res) => {
    const token = req.headers['x-access-token']

    try{
        const user = jwt.verify(token, process.env.ACCESS_TOKEN)
        const email = user.email
        await Note.updateOne({ _id: req.body.id }, { $set: { title: req.body.title, description: req.body.description }})
        console.log('Note Updated')
        return res.json({ status: 'ok' })
    }
    catch(error){
        console.log(error)
        return res.json({ status: 'error' })
    }
}


export const deleteNotes = async (req, res) => {
    const token = req.headers['x-access-token']

    try{
        const user = jwt.verify(token, process.env.ACCESS_TOKEN)
        const email = user.email
        await Note.deleteOne({ _id: req.body.id })
        console.log('Note Deleted')
        return res.json({ status: 'ok' })
    }
    catch(error){
        console.log(error)
        return res.json({ status: 'error' })
    }
}