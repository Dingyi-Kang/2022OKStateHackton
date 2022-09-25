const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: String,
    speed: String,
    location: String
})

const Data = mongoose.model('data', userSchema)

module.exports = Data;