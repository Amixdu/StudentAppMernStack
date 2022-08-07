import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Note = new Schema(
    {
        email: { type: String, required: true },
        title: {type: String, required: true},
        description: {type: String, required: true}
    },
    { collections: 'notes'}
)

const model = mongoose.model('Notes', Note)

export default model