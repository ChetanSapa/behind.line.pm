const mongoose = require('mongoose')

async function dbConnect() {
    if (process.env.NODE_ENV === "development "){
        mongoUrl = "mongodb://qwerty:" + process.env.MONGO_DEV_PASS + "@localhost:27017/behindline?authSource=behindline"
        console.log(process.env.NODE_ENV + '1');
    } else {
        console.log(process.env.NODE_ENV + '2');
        mongoUrl = "mongodb://qwerty:" + process.env.MONGO_PROD_PASS + "@127.0.0.1:27017/behindline?authSource=behindline"
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.db
    }

    let url = 'mongodb://localhost:27017/behindline'
    let options = {
        user: 'qwerty',
        pass: process.env.NODE_ENV === "development " ? process.env.MONGO_DEV_PASS : process.env.MONGO_PROD_PASS,
        auth: {authSource: 'behindline'}
    }

    return mongoose.connect(url, options)
}

module.exports = dbConnect