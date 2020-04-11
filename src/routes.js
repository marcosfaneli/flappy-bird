const express = require('express');

const GameController = require('./controllers/GameController');
const RankingController = require('./controllers/RankingController');

const RankingValidator = require('./validators/RankingValidator');

const routes = express.Router();

routes.get('/', GameController.index);

routes.get('/ranking', RankingController.index);
routes.post('/ranking', RankingValidator.create(), RankingController.create);


module.exports = routes;