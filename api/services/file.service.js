const dbConnect = require("./dbConnect");
const mongoose = require("mongoose");
const File = require("../models/File")
// const {query} = require("express");

async function saveFile(path, user) {
    await dbConnect()
    const file = new File({
        path: path,
        user: user._id,
    })
        return await file.save()

}
async function getFileById(id) {
    await dbConnect()
    const collection = mongoose.model('file')
    let file = await collection.findOne({_id : id})
     
    return file ? file : ''

}
async function deleteFileById(id) {
    await dbConnect()
    const collection = mongoose.model('file')
    return await collection.deleteOne({_id : id})

}

module.exports = {saveFile, getFileById, deleteFileById}