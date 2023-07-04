const dbConnect = require("./dbConnect");
const mongoose = require("mongoose");
const User = require("../models/User")

async function save (userData) {
    await dbConnect()

    if( await User.findOne(userData)){
        return {message: 'User already exist'}
    } else {
        const collection = mongoose.model('users')
        await collection.create({
            email: userData.email,
            password: userData.password,
            username: 'user' + new Date().getTime(),
            role: 'user'
        })
        return {message: 'User was successfully created', userData}
    }
}

module.exports = {save}