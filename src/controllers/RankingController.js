const Ranking = require('../models/RankingModel');

module.exports = {
  async index(request, response) {
    try {
      var query = await Ranking.find().sort({score:'desc'}).limit(5).exec();

      return response.json(query);

    } catch (error) {
      response.status(404).send(error)      
    }
  },

  async create(request, response) {
    const query = Ranking.find({ email: request.body.email });
    query.exec(function (err, docs) {
      if (docs.length == 0) {
        let ranking = new Ranking(request.body);
        ranking.save()
          .then(ranking => {
            response.status(200).json({ 'ranking': 'ranking in added successfully' });
          })
          .catch(err => {
            response.status(400).send("unable to save to database");
          });
      } else {
        let ranking = docs[0];

        ranking.email = request.body.email;
        ranking.score = request.body.score;

        ranking.save().then(ranking => {
          response.json('Update complete');
        })
          .catch(err => {
            response.status(400).send("unable to update the database");
          });
      }
    })
  }
}