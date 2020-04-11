const mongoose = require('mongoose');

const uri = "mongodb+srv://faneli:tvEisefKwCVnIAId@cluster0-mpje9.gcp.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;