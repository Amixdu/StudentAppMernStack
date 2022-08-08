import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
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
        text: 'Click ' + link + ' and enter the password: ' + password
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
    console.log(req.body)
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
        sendEmail(req.body.email, tempPw, 'http://localhost:3000/login')
        res.json({ status: 'success' })
    } 
    catch(e){
        console.log(e)
        res.json({ status: 'error' })
    }
}

export const loginUser = async (req, res) => {
    const userData = await User.findOne({ email: req.body.email, password: req.body.password })
    if (userData) {
        console.log("YES")
        const user = { email: req.body.email }
        const token = jwt.sign(user, process.env.ACCESS_TOKEN)

        return res.json({ status: 'success', user: token, userStatus: userData.status, accountType: userData.accountType })
    }
    else{
        console.log("NO")
        return res.json({ status: 'error' })
    }
}


export const addUserInfo = async (req, res) => {
    const token = req.headers['x-access-token']

    try{
        const user = jwt.verify(token, process.env.ACCESS_TOKEN)
        const email = user.email
        const userData = await User.findOne({ email: email })
        await User.updateOne({ email: email }, { $set: 
            { 
                firstName: req.body.firstName, 
                lastName: req.body.lastName, 
                email: email,   
                dateOfBirth: req.body.dateOfBirth,
                mobile: req.body.mobile,
                status: false,
                password: req.body.resetPassword,
                accountType: userData.accountType
            }})
        console.log('User Details Updated')
        return res.json({ status: 'ok' })
    }
    catch(error){
        console.log(error)
        return res.json({ status: 'error' })
    }
}