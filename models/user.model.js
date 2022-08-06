const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { type: String, required: true, unique: true },
        notes: {type: String}
    },
    { collections: 'users'}
)

const model = mongoose.model('Users', User)

module.exports = model