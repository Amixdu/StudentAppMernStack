import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        dateOfBirth: { type: Date, required: true },
        mobile: { type: Number, required: true },
        status: { type: Boolean, required: true },
        password: { type: String, required: true },
        accountType: { type:String, required: true }
    },
    { collections: 'users'}
)

const model = mongoose.model('Users', User)

export default model