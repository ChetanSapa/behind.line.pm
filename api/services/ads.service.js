const dbConnect = require("./dbConnect");
const mongoose = require("mongoose");
const Ad = require("../models/Ads")

const getAds = async (skip, category) => {

}
const getAdById = async (_id) => {
    await dbConnect()
    const collection = mongoose.model('ads')
    const ad = await collection.findOne({_id: _id})
    return ad

}
const getAdsByUserId = async (_id) => {
    console.log(_id)
    console.log('_id')
    await dbConnect()
    const collection = mongoose.model('ads')
    const ads = await collection.find({user: _id})
    return ads
}
const saveAd = async (ad, _id) => {
    await dbConnect()
    const doc = new Ad({
        title: ad.title,
        text: ad.text,
        category: ad.category,
        published: ad.published,
        price: ad.price,
        images: ad.images,
        user: _id
    })
    return await doc.save()
}
const updateAd = async ({ad}) => {
    await dbConnect()
    const collection = mongoose.model('ads')
    let doc = await collection.findOne({_id: ad._id})
    console.log(doc)
    console.log('doc')

    doc['title'] = ad.title
    doc['text'] = ad.text
    doc['category'] = ad.category
    doc['published'] = ad.published
    doc['price'] = ad.price
    doc['images'] = ad.images
    doc['user'] = ad.user

    return await doc.save()
}
const deleteAdById = async (adId, userId) => {
    console.log()
    await dbConnect()
    const collection = mongoose.model('ads')
    await collection.deleteOne({_id: adId})
    const ads = await collection.find({user: userId})
    console.log(ads)
    console.log('ads')
    return ads

}

module.exports = {getAds, getAdById, getAdsByUserId, saveAd, updateAd, deleteAdById}