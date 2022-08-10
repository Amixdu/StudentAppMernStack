import mongoose from "mongoose";
import User from './models/user.model.js';

const EMAIL = 'admin@gmail.com'

const CONNECTION_URL = 'mongodb+srv://amin:qwerty1029384756@cluster0.qnehnrn.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(CONNECTION_URL)
    .then(() => {
        console.log("Connected to Mongo!")
    })
    .catch((err) => console.log(err))

const admin = {
    firstName: 'undefined',
    lastName: 'undefined',
    email: EMAIL,
    dateOfBirth: Date(),
    mobile: 0,
    status: true,
    password: 'password',
    accountType: 'admin'
}

const seeder = async () => {
    await User.deleteOne({ email: EMAIL });
    await User.create(( admin ))
}

seeder().then(() => {
    console.log('Admin account added')
    mongoose.connection.close()
})