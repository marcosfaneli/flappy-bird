const cool = require('cool-ascii-faces')
const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()

app.get('/', (req, res) => res.sendFile( __dirname + '/index.html'));

app.get('/cool', (req, res) => res.send(cool()))

app.use(express.static(path.join(__dirname, '/script')))

app.listen(PORT, () => console.log(`listening at ${PORT}`))