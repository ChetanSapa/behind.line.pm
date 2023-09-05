const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
    path: {
        type: String,
        require: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: {
        type: String
    }
}, {autoCreate: true})

const File = mongoose.model('file', schema)
module.exports = File