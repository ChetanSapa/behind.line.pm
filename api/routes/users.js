const express = require('express')
const {save} = require("../services/user.service");
const router = express.Router()

router.get('/', (req, res) => {
    res.send({ok: true, user: '123'})
})
router.post('/signup', async (req, res) => {
    const user = req.body
    try {
        // console.log(await save(user))
        res.json(await save(user))
    } catch (e) {
        console.error(e)
        res.json(user)
    }
})

module.exports = router