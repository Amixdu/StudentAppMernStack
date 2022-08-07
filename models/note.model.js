const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const Note = new Schema(
    {
        email: { type: String, required: true, unique: true },
        title: {type: String, required: true},
        description: {type: String, required: true}
    },
    { collections: 'notes'}
)

const model = mongoose.model('Notes', Note)

module.exports = model