const express = require('express')
const app = express()
const port = 9000

app.get('/', (req, res)=> {
    res.send('Hi man!!! yo!)')
})
app.get('/', (req, res)=> {
    res.send('Hi man!!!)')
})
app.listen(port, ()=>{
    console.log(`Express starting on port ${port}`)
})