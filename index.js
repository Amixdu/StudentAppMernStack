
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.post('/api/create', (req, res) => {
    console.log(req.body)
    res.json({ status: 'ok' })
})

app.listen(8000, () => {
    console.log("Started on: http://localhost:8000/")
})