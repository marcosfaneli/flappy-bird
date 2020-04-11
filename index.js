const express = require('express')
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rankingRoutes = require('./ranking.route');

const app = express()

// const uri = "mongodb://172.17.0.4:27017/ranking";
const uri = "mongodb+srv://faneli:tvEisefKwCVnIAId@cluster0-mpje9.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

mongoose
    .createConnection(uri, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(
        () => { console.log('Database is connected') },
        err => { console.log('Can not connect to the database' + err) }
    );

const PORT = process.env.PORT || 5000

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/script')))
app.use(express.static(path.join(__dirname, '/img')))

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

app.use('/ranking', rankingRoutes);

app.listen(PORT, () => console.log(`listening at ${PORT}`))