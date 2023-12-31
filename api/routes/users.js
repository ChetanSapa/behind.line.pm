const express = require('express')
const {save, getAllUsers, delAllUsers, getDataForLogin, getUserById, updateUser, getUsersByQuery} = require("../services/user.service");
const session = require("express-session");
const {raw} = require("express");
const router = express.Router()

router.get('/', (req, res) => {
    res.send({ok: true})
})
router.get('/search', async (req, res) => {

    const query = req.query
    const data = await getUsersByQuery(query)

    res.send({ok: true, data})
})
router.get('/id/:id', async (req, res) => {
    let user
    let isAdmin
    try {
        const _id = req.session.user._id
        const me = await getUserById(_id)
        isAdmin = me.role === 'admin'
        user = await getUserById(req.params.id, isAdmin)
        console.log(user + ' user')
    } catch (e) {
        user = await getUserById(req.params.id)
    }

    res.json({ok: true, user, isAdmin})
})
router.get('/me', async (req, res) => {
    const _id = req.session.user._id
    const user = await getUserById(_id)
    res.json({ok: true, user})
})
router.get('/get/all', async (req, res) => {
    let users
    let isAdmin
    try {
        const _id = req.session.user._id
        const me = await getUserById(_id)
        console.log(me.role)
        isAdmin = me.role === 'admin'
        users = await getAllUsers(isAdmin)
    } catch (e) {
        users = await getAllUsers()
    }
    console.log(isAdmin)
    res.json({ok: true, isAdmin: isAdmin, users: users})
})
router.get('/delete/all', async (req, res) => {

    const users = await delAllUsers()

    res.json({ok: true, users: users})
})
router.post('/signup', async (req, res) => {
    const user = req.body
    try {
        await save(user)
        const data = await getDataForLogin(user)
        req.session.user = {_id: data._id}
        await req.session.save()
        res.json({ok: true, message: 'Registration done. Now you being redirected'})
    } catch (e) {
        console.error(e)
        res.json({ok: false, message: "Something went wrong"})
    }
})
router.post('/login', async (req, res) => {
    const userData = req.body
    const data = await getDataForLogin(userData)
    if (data) {
        req.session.user = {_id: data._id}
        await req.session.save()
        const user = data._doc
        res.json({ok: true, ...user, message: 'Now you being redirected'})
    } else {
        res.json({ok: false, message: 'Registration needed'})
    }
})

router.post('/check/auth', async (req, res) => {
    if (!req.session.user) {
        res.json({ok: false, message: 'Authorization needed'}).end()
        return
    }

    const userId = req.session.user._id
    const data = await getUserById(userId)
    if (data) {
        res.send({ok: true, role: data._doc.role, message: 'Authorization done'})
    } else {
        res.json({ok: false, message: 'Something went wrong'})
    }
})

router.post('/update', async (req, res) => {
    if (!req.session.user) {
        res.json({ok: false, message: 'Authorization needed'}).end()
        return
    }
    const userId = req.session.user._id
    const data = await getUserById(userId)
    const updatedUser = await updateUser(req.body)
    const newUserName = updatedUser._doc.username

    if (data) {
        res.send({ok: true, message: 'User name successfully updated', newUserName})
    } else {
        res.json({ok: false, message: 'Something went wrong'})
    }
})
router.get('/logout', async (req, res) => {
    const domain = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://behind.line.pm'

    req.session.destroy()
    res.clearCookie('connect.sid', {path: '/'})

    res.redirect(domain)
})

module.exports = router