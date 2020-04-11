const { celebrate, Segments, Joi } = require('celebrate');

module.exports = {
  index() { 

  },

  create() {
    return celebrate({
      [Segments.BODY]: Joi.object().keys({
        email: Joi.string().required().email(),
        score: Joi.number().required(),
      })
    })
  }
}

