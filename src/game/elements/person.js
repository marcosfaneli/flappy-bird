function Personagem() {

  this.imgPerson = openImage("../img/person.png");

  this.bonecoParado = new Sprite(this.imgPerson, 0, 0, 80, 80);
  this.bonecoDireito = new Sprite(this.imgPerson, 80, 0, 80, 80);
  this.bonecoEsquerdo = new Sprite(this.imgPerson, 160, 0, 80, 80);
  this.bonecoCorrendo = new Sprite(this.imgPerson, 240, 0, 80, 80);
  this.bonecoPulando = new Sprite(this.imgPerson, 400, 0, 80, 80);

  this.boneco = this.bonecoDireito;

  this.x = 50;
  this.y = 0;
  this.altura = this.bonecoDireito.altura;
  this.largura = this.bonecoDireito.largura;
  this.cor = "#610B0B";
  this.gravidade = 1.6;
  this.velocidade = 0;
  this.forcaDoPulo = 23.6;
  this.quantidadePulos = 0;
  this.score = 0;
  this.v = 0;
}

Personagem.prototype.atualiza = function () {
  this.velocidade += this.gravidade;
  this.y += this.velocidade;

  if (this.y > chao.y - this.altura && estadoAtual != estados.perdeu) {
    this.y = chao.y - this.altura;
    this.quantidadePulos = 0;
    this.velocidade = 0;
  }
}

Personagem.prototype.pula = function () {
  if (this.quantidadePulos < maximoPulos) {
    this.velocidade = -this.forcaDoPulo;
    this.quantidadePulos++;
  }
}

Personagem.prototype.reset = function () {
  this.y = 0;
  this.velocidade = 0;
  this.score = 0;
}

Personagem.prototype.desenha = function () {
  if (estadoAtual == estados.parado) {
    this.boneco = this.bonecoParado;
  } else {
    if (frames % 10 == 0) {
      this.v = this.v == 0 ? 1 : 0;
    }
    if (this.quantidadePulos > 0) {
      this.boneco = this.bonecoPulando;
    } else {
      this.boneco = this.v == 0 ? this.bonecoDireito : this.bonecoCorrendo;
    }

  }

  this.boneco.desenha(this.x, this.y);
}