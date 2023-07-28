const dbConnect = require("./dbConnect");
const mongoose = require("mongoose");
const User = require("../models/User")

async function save(userData) {
    await dbConnect()
    const collection = mongoose.model('users')
    const user = await collection.findOne(userData)
    if (user) {
        return {message: 'User already exist'}
    } else {
        // const collection = mongoose.model('users')
        await collection.create({
            email: userData.email,
            password: userData.password,
            username: 'user' + new Date().getTime(),
            role: 'user'
        })
        return {message: 'User was successfully created'}
    }
}

const getDataForLogin = async (userData) => {
    await dbConnect()
    const collection = mongoose.model('users')
    const user = await collection.findOne({email: userData.email, password: userData.password})
    return user
}

const getUserById = async (userId) => {
    await dbConnect()
    const collection = mongoose.model('users')
    const user = await collection.findOne({_id: userId})
    return user
}
const updateUser = async (user) => {
    await dbConnect()
    const collection = mongoose.model('users')
    const data = await collection.findOne({_id: user._id})

    data['username'] = user.username
    await data.save()
    return data
}
const getAllUsers = async () => {
    await dbConnect()
    const collection = mongoose.model('users')
    const users = await collection.find({})
    return users
}

const delAllUsers = async () => {
    await dbConnect()
    const collection = mongoose.model('users')
    const users = await collection.deleteMany({})
}

module.exports = {save, getAllUsers, delAllUsers, getDataForLogin, getUserById, updateUser}