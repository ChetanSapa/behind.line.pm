require('dotenv').config()
const express = require('express')
const app = express()
const port = 9001
const cors = require('cors')

app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://behind.line.pm']
}))

const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const allRouter = require('./routes/all')

app.use(express.json())
app.use('*', allRouter)
app.use('/', indexRouter)
app.use('/users', usersRouter)
app.listen(port, ()=>{
    console.log(`Express starting on port ${port}`)
})