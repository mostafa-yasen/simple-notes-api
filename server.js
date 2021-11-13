const express = require('express')
const bodyParser = require('body-parser')

const router = require('./routes/notes')
const app = express()
const port = 9090

app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('Home')
})

app.use('/api/v1', router)

app.listen(port, () => {
    console.log(`Server is lestening on http://localhost:${port}`)
})
