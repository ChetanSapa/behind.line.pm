const express = require('express')
const multer = require("multer");
const {getUserById, updateUser} = require("../services/user.service");
const {saveFile, getFileById, deleteFileById} = require("../services/file.service");
const fs = require("fs");
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        const extension = /[^.]+$/.exec(file.originalname)
        const path = '/uploads'
        fs.mkdirSync(path, {recursive: true})
        cb(null, Date.now() + Math.floor(Math.random() + 100000) + '.' + extension)
    }
})

const upload = multer({
    storage
})
router.post('/uploads', upload.single('file'), async (req, res) => {

    try {
        const _id = req.session.user._id
        console.log(_id + ' id')
        const me = await getUserById(_id)
        console.log(me)
        console.log('/' + req.file.path + ' path 1')
        let path = req.file.path.replace(/\\/g, '/')
        console.log('\\' + req.file.path + ' path 2')
        console.log('/' + path + ' path 3')
        // const uploadedFile = await saveFile('\\' + req.file.path, me)
        const uploadedFile = await saveFile('/' + path, me)

        console.log(uploadedFile + ' uploadedFile')

        me['files'] = me.files ? me.files.push(uploadedFile) : [uploadedFile]
        me['avatar'] = uploadedFile

        await updateUser(me)
        console.log(me)

        console.log(req.files + ' req.files')
        // res.json({ok: true})

        res.status(200).end()
    } catch (e) {
        res.status(401).end()
    }
})

router.get('/id/:id', async (req, res) => {

    const file = await getFileById(req.params.id)

    res.sendFile(file.path, {root: process.cwd()})
})

router.post('/delete/id/:id', async (req, res) => {

    try {
        const _id = req.session.user._id
        const me = await getUserById(_id)

        if (me.avatar != null 
            && (me.avatar._id.toString() === req.params.id)) {
            me['avatar'] = null}

        me.files.pull({_id: req.params.id})

        await updateUser(me)

        const file = await getFileById(req.params.id)
        if (file) {
            fs.unlinkSync(process.cwd() + file.path)
            await deleteFileById(req.params.id)
        }
        res.json({message: 'File successfully deleted'})
    }catch (e) {
        res.json(e)
    }

})

module.exports = router