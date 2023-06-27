const express = require('express')
const app = express()
const port = 9001

app.get('/', (req, res)=> {
    res.send('Hi man!!! yo! Man! Yes!!!!!!!!!AZAZA)')
})

app.listen(port, ()=>{
    console.log(`Express starting on port ${port}`)
})