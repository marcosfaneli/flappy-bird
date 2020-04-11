const path = require('path')

module.exports = {
  async index(request, response) {
    console.log(path.join(__dirname, '..', '/index.html'));
    return response.sendFile(path.join(__dirname, '..', '/index.html'));
  }
}