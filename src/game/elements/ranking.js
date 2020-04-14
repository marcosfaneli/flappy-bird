function Ranking() {
  let recorde = 0;
  let scores = [];
}

Ranking.prototype.carrega = async () => {
  let response = await Api().get('/ranking');
  scores = await response.data;

  recorde = scores[0].score;
}

Ranking.prototype.atualiza = async (email, score) => {
  if (score > recorde) {
    const json = {'email': email, 'score': score};
  
    await Api().post('/ranking', json);

    location.reload();
  }
}

Ranking.prototype.getRecorde = () => {
  return recorde;
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

  scores.forEach(score => {
    ctx.fillText(`${posicao} ${score.email.padEnd(28, " ")} ${score.score.toString().padStart(5, " ")}`, LARGURA - 310, (posicao * 22) + 64);
    posicao++;
  });
}