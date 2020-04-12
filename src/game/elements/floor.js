function Chao() {
  this.y = ALTURA - 50;
  this.altura = 50;
  this.cor = "#FE9A2E";
}

Chao.prototype.desenha = function () {
  ctx.fillStyle = this.cor;
  ctx.fillRect(0, this.y, LARGURA, this.altura);
}
