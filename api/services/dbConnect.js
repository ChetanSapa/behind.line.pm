const mongoose = require('mongoose')

async function dbConnect() {

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.db
    }

    let url = 'mongodb://localhost:27017/behind_line'
    let options = {
        user: 'admin@',
        pass: 'qwerty@admin',
        auth: {authSource: 'behind_line'}
    }

    return mongoose.connect(url, options)
}

module.exports = dbConnect