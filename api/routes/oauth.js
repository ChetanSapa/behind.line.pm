const express = require('express')
const router = express.Router()

router.get('/google', (req, res)=>{
    res.send('Route index')
})

module.exports = router