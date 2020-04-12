function Ranking() {
  this.recorde = 0;
  this.scores =
    [
      { email: "paolasbasso@gmail.com", score: 100 },
      { email: "marcosfaneli@gmail.com", score: 98 },
      { email: "eduardofaneli2@gmail.com", score: 77 },
      { email: "nidalee@gmail.com", score: 3 },
      { email: "hannah@gmail.com", score: 1 },
    ]
}

Ranking.prototype.loadRanking = async () => {
  let response = await Api().get('/ranking');
  return response.data;
}

Ranking.prototype.carrega = function () {
  this.recorde = localStorage.getItem("recorde");
  if (!this.recorde) {
    this.recorde = 0;
  }
  console.log(this.recorde);
}

Ranking.prototype.atualiza = function (personagem) {
  if (personagem.score > this.recorde) {
    localStorage.setItem("recorde", personagem.score);
  }
}

Ranking.prototype.desenha = function () {
  ctx.fillStyle = "#A020F0";
  ctx.fillRect(LARGURA - 320, 20, 300, 180);

  ctx.fillStyle = "#FDF5E6";
  ctx.fillRect(LARGURA - 314, 62, 288, 130);

  ctx.fillStyle = "#000";
  ctx.font = "bold 32px Arial";
  ctx.fillText("Ranking", LARGURA - 308, 52);

  ctx.fillStyle = "#DEDBDA";
  ctx.font = "bold 32px Arial";
  ctx.fillText("Ranking", LARGURA - 310, 50);

  ctx.fillStyle = "#000";
  ctx.font = "14px consolas";
  let posicao = 1;
  // console.log(this.scores);
  this.scores.forEach(score => {
    ctx.fillText(`${posicao} ${score.email.padEnd(28, " ")} ${score.score.toString().padStart(5, " ")}`, LARGURA - 310, (posicao * 22) + 64);
    posicao++;
  });
}