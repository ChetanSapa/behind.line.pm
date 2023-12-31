require('dotenv').config()
const express = require('express')
const app = express()
const port = 9001
const cors = require('cors')
const logger = require('morgan')
const sessions = require('express-session')
const MongoStore = require('connect-mongo')

process.title = 'api';

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://behind.line.pm']
}))

let mongoUrl

console.log(process.env.NODE_ENV)

if (process.env.NODE_ENV === "development"){
    mongoUrl = "mongodb://qwerty:" + process.env.MONGO_DEV_PASS + "@localhost:27017/behindline?authSource=behindline"
} else {
    console.log(process.env.NODE_ENV + '1');
    mongoUrl = "mongodb://qwerty:" + process.env.MONGO_PROD_PASS + "@127.0.0.1:27017/behindline?authSource=behindline"
    console.log(mongoUrl)
}
app.use(sessions({
    secret: 'xcaczvvdzs',
    store: MongoStore.create({
        mongoUrl: mongoUrl,
        ttl: 30*24*60*60,
    }),
    resave:false,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000*60*60*24*30
    }
}))

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const allRouter = require('./routes/all')
const oauthRouter = require('./routes/oauth')
const filesRouter = require('./routes/files')
const adsRouter = require('./routes/ads')

app.use(logger('dev'))
app.use(express.json())
app.use('*', allRouter)
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/oauth', oauthRouter)
app.use('/files', filesRouter)
app.use('/ads', adsRouter)
app.listen(port, ()=>{
    console.log(`Express starting on port ${port}`)
})