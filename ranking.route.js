const express = require('express');
const rankingRoutes = express.Router();

// Require Business model in our routes module
let Ranking = require('./ranking.model');

// Defined get data(index or listing) route
rankingRoutes.route('/').get(function (req, res) {
    const query = Ranking.find().limit(10);
    query.exec(function(err, rankings){
    if(err){
      console.log(err);
    }
    else {
      res.json(rankings);
    }
  });
});

//  Defined update route
rankingRoutes.route('/').post(function (req, res) {
    const query = Ranking.find({email: req.body.email});
    query.exec(function (err, docs) {
        if(docs.length == 0){
            let ranking = new Ranking(req.body);
            ranking.save()
            .then(ranking => {
                res.status(200).json({'ranking': 'ranking in added successfully'});
            })
            .catch(err => {
            res.status(400).send("unable to save to database");
            });
        } else {
            let ranking = docs[0];

            ranking.email = req.body.email;
            ranking.score = req.body.score;

            ranking.save().then(ranking => {
                res.json('Update complete');
            })
            .catch(err => {
                res.status(400).send("unable to update the database");
            });
        }
    })
});

module.exports = rankingRoutes;