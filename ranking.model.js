const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let Ranking = new Schema({
  email: {
    type: String
  },
  score: {
    type: String
  },
},{
    collection: 'ranking'
});

module.exports = mongoose.model('Ranking', Ranking);