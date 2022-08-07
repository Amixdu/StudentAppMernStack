import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const createUser = async (req, res) => {
    console.log(req.body)
    try{
        const user = await User.create({
            id: 2,
            firstName: 'Test',
            lastName:'TestLast',
            email: req.body.email,
            dateOfBirth: new Date('December 17, 1995 03:24:00'),
            mobile: 123456,
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
}

export const loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password })
    if (user) {
        console.log("YES")
        const user = { email: req.body.email }
        const token = jwt.sign(user, process.env.ACCESS_TOKEN)

        return res.json({ status: 'success', user: token})
    }
    else{
        console.log("NO")
        return res.json({ status: 'error' })
    }
}