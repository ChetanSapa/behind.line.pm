const express = require('express')
const router = express.Router()
const {getUserById} = require('../services/user.service')
const {saveAd, getAdById, updateAd, getAdsByUserId, deleteAdById} = require('../services/ads.service')

router.get('/id/:id', async (req, res) => {
    const ad = await getAdById(req.params.id)

    if (!ad) {
        res.status(404).end()
        return
    }

    const userId = req.session.user._id

    if (!ad.published && ad.user._id.toString() !== userId) {
        res.status(404).end()
        return
    }
    res.json({ok: true, ad})

})
router.get('/category/:category', async (req, res) => {

})
router.get('/my', async (req, res) => {
    if (!req.session.user) {
        res.status(401).end()
        return
    }

    const userId = req.session.user._id
    const user = await getUserById(userId)
    console.log(req.body + " ads.js req.body!");
    const ads = await getAdsByUserId(user._id)

    res.json({ok: true, ads})
})
router.post('/save', async (req, res) => {
    if (!req.session.user) {
        res.status(401).end()
        return
    }

    const userId = req.session.user._id
    const user = await getUserById(userId)
    const ad = await saveAd(req.body, user._id)

    res.json({ok: true, ad})
})
router.post('/update', async (req, res) => {

    if (!req.session.user) {
        return res.status(401).end()
    }

    const _id = req.session.user._id
    let ad = await getAdById(req.body._id)

    if (!ad) {
        return res.status(404).end()
    }

    if (_id !== ad.user._id.toString()) {
        return res.status(403).end()
    }

    ad = req.body

    await updateAd({ad})
    res.json({ok: true})
})
router.post('/delete', async (req, res) => {
    if (!req.session.user) {
        res.status(401).end()
        return
    }

    const userId = req.session.user._id
    const user = await getUserById(userId)
    console.log(req.body._id + " ads.js req.body!");
    const ads = await deleteAdById(req.body._id, user._id)
    res.json({ok: true,ads})
})

module.exports = router