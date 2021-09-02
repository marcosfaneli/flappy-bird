const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb://localhost/test';

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.Promise = global.Promise;

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = mongoose;