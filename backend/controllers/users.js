import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()

const generateTempPassword = () => {
    var pass = '';
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
    for (let i = 1; i <= 8; i++) {
        var char = Math.floor(Math.random() * str.length + 1);
        pass += str.charAt(char)
    }
        
    return pass;
}

const sendEmail = (email, password, link) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'serveraccinternship@gmail.com',
          pass: 'mpppdxpzjdpjctzz'
        }
    });

    const mailOptions = {
        from: 'serveraccinternsip@gmail.com',
        to: email,
        subject: 'Login Details',
        text: `Dear User,\n\nIf using localhost, click ${link}\nIf using heroku link, click https://studentapplicationmern.herokuapp.com/ \nPassword: ${password}\n\nRegards,\nAmindu`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

}

export const createUser = async (req, res) => {
    const tempPw = generateTempPassword()
    try{
        const user = await User.create({
            firstName: ' ',
            lastName:' ',
            email: req.body.email,
            dateOfBirth: new Date(),
            mobile: 0,
            status: true,
            password: tempPw,
            accountType: 'student'
        })
        sendEmail(req.body.email, tempPw, 'http://localhost:3000/')
        res.json({ status: 'success' })
    } 
    catch(e){
        console.log(e)
        res.json({ status: 'error' })
    }
}

export const loginUser = async (req, res) => {
    const userData = await User.findOne({ email: req.body.email })

    if (!userData) {
        return  res.json({ status: 'error' })
    }

    // If this is a first time login, the passwords are not hashed, so compare directly
    // If not a first time login, passwords are hashed, so using bcrypt to compare
    const isPwValid = userData.status ? (req.body.password === userData.password) : await bcrypt.compare(req.body.password, userData.password)
    if (isPwValid) {
        const user = { email: req.body.email }
        const token = jwt.sign(user, process.env.ACCESS_TOKEN)

        return res.json({ status: 'success', user: token, userStatus: userData.status, accountType: userData.accountType })
    }
    else{
        return res.json({ status: 'error' })
    }
}


export const addUserInfo = async (req, res) => {
    const token = req.headers['x-access-token']

    try{
        const user = jwt.verify(token, process.env.ACCESS_TOKEN)
        const email = user.email
        const userData = await User.findOne({ email: email })
        const password = await bcrypt.hash(req.body.resetPassword, 10)
        await User.updateOne({ email: email }, { $set: 
            { 
                firstName: req.body.firstName, 
                lastName: req.body.lastName, 
                email: email,   
                dateOfBirth: req.body.dateOfBirth,
                mobile: req.body.mobile,
                status: false,
                password: password,
                accountType: userData.accountType
            }})
        return res.json({ status: 'ok' })
    }
    catch(error){
        console.log(error)
        return res.json({ status: 'error' })
    }
}

export const getUsers = async (req, res) => {
    const PAGE_SIZE = 5
    const page = parseInt(req.query.page || "0")
    const token = req.headers['x-access-token']
    const totalUsers = await User.countDocuments({})
    const totalPages = Math.ceil((totalUsers / PAGE_SIZE))
    try{
        jwt.verify(token, process.env.ACCESS_TOKEN)
        const data = await User.find().limit(PAGE_SIZE).skip(PAGE_SIZE * page)

        return res.json({ status: 'ok', users: data, totalPages:totalPages })
    }
    catch(error){
        return res.json({ status: 'error' })
    }  
}

export const getFilteredUsers = async (req, res) => {
    const PAGE_SIZE = 5
    const page = parseInt(req.query.page || "0")
    const token = req.headers['x-access-token']
    let totalUsers = 0
    const filterVariable = req.body.filterVariable
    const filterVariableData = req.body.filterVariableData
    const search = filterVariable === 'Email' ? { email: filterVariableData } : (filterVariable === 'ID' ? { _id: filterVariableData } : { firstName: filterVariableData })
    try{
        jwt.verify(token, process.env.ACCESS_TOKEN)
        totalUsers = await User.countDocuments(search)   
        const totalPages = Math.ceil((totalUsers / PAGE_SIZE))
        const data = await User.find(search).limit(PAGE_SIZE).skip(PAGE_SIZE * page)
        return res.json({ status: 'ok', users: data, totalPages:totalPages })
    }catch{
        return res.json({ status: 'error' })
    }
}

export const userAuthenticate = async (req, res) => {
    const token = req.headers['x-access-token']

    try{
        const user = jwt.verify(token, process.env.ACCESS_TOKEN)
        const email = user.email
        const data = await User.findOne({ email: email })
        return res.json({ status: 'ok', accountType: data.accountType, userStatus: data.status })
    }
    catch(error){
        return res.json({ status: 'error' })
    }  
}