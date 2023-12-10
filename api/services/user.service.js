const dbConnect = require("./dbConnect");
const mongoose = require("mongoose");
const User = require("../models/User")
const {query} = require("express");

async function save(userData) {
    await dbConnect()
    const collection = mongoose.model('users')
    const user = await collection.findOne(userData)
    if (user) {
        return {message: 'User already exist'}
    } else {
        const collection = mongoose.model('users')
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

const getUserById = async (userId, isAdmin) => {
    await dbConnect()
    const collection = mongoose.model('users')
    let user

    if (isAdmin) {
        user = await collection.findOne({_id: userId})
    } else {
        user = await collection.findOne({_id: userId}, {password: 0, __v: 0})
    }
    return user
}
const updateUser = async (user) => {
    await dbConnect()
    const collection = mongoose.model('users')
    const data = await collection.findOne({_id: user._id})

    data['username'] = user.username
    data['name'] = user.name
    data['birthday'] = user.birthday
    data['about'] = user.about
    data['files'] = user.files
    data['avatar'] = user.avatar
    await data.save()
    return data
}
const getAllUsers = async (isAdmin) => {
    await dbConnect()
    const collection = mongoose.model('users')
    let users
    if (isAdmin) {
        users = await collection.find({})
    } else {
        users = await collection.find({}, {password: 0, __v: 0})
    }
    return users
}
const getUsersByQuery = async (query) => {
    await dbConnect()
    const collection = mongoose.model('users')
    let users
    if (query) {
        users = await collection.find({
                $or: [
                    {about: new RegExp(decodeURI(query.about), 'i')},
                    {name: new RegExp(decodeURI(query.name), 'i')}
                ]
            }
        )
    } else {
        users = await collection.find({})
    }
    return users
}

'about: new RegExp(decodeURI(query))'

const delAllUsers = async () => {
    await dbConnect()
    const collection = mongoose.model('users')
    const users = await collection.deleteMany({})
}

module.exports = {save, getAllUsers, delAllUsers, getDataForLogin, getUserById, updateUser, getUsersByQuery}