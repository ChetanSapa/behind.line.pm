const express = require('express')
const router = express.Router()
router.all('*', (req, res, next) => {
    const domain = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://behind.line.pm';
    console.log(domain)

    res.setHeader('Access-Control-Allow-Origin', domain)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

module.exports = router