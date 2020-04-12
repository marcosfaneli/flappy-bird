function Api() {
  this.baseUrl = "http://faneli-game.herokuapp.com";

  return axios.create({
    baseURL: this.baseURL,
  });  
}