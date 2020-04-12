function Obstaculo() {
  this._obs = [];
  this._cores = RandomColor;  
  this.tempoInsere = 100;  
}

Obstaculo.prototype.insere = function () {
  this._obs.push({
    x: LARGURA,
    largura: 30 + Math.floor(80 * Math.random()),
    altura: 30 + Math.floor(120 * Math.random()),
    cor: this._cores()//[Math.floor(5 * Math.random())],
  });
  this.tempoInsere = 80 + Math.floor(60 * Math.random());
}

Obstaculo.prototype.atualiza = function () {
  if (this.tempoInsere == 0) {
    this.insere()
  } else {
    this.tempoInsere--;
  }

  for (var i = 0, tamanho = this._obs.length; i < tamanho; i++) {
    var obs = this._obs[i];

    obs.x -= velocidade;

    if ((bloco.x < obs.x + obs.largura) && (bloco.x + bloco.largura >= obs.x) && (bloco.y + bloco.altura >= chao.y - obs.altura)) {
      estadoAtual = estados.perdeu;
    } else if (obs.x <= -obs.largura) {
      bloco.score++;
      this._obs.splice(i, 1);
      tamanho--;
      i--;
    }
  }
}

Obstaculo.prototype.limpa = function () {
  this._obs = [];
}

Obstaculo.prototype.desenha = function () {
  for (var i = 0, tamanho = this._obs.length; i < tamanho; i++) {
    var obs = this._obs[i];
    ctx.fillStyle = obs.cor;
    ctx.fillRect(obs.x, chao.y - obs.altura, obs.largura, obs.altura);
  }
}
