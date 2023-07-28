const express = require('express')
const router = express.Router()
router.all('*', (req, res, next) => {
    let trim = process.env.NODE_ENV.trim()
    let domain
    domain = trim === "development" ? process.env.DEV_HOST : process.env.PROD_HOST;

    res.setHeader('Access-Control-Allow-Origin', domain)
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    next()
})

module.exports = router