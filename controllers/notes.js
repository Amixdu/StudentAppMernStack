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