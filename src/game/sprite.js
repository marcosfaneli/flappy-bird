function Sprite(image, x, y, largura, altura) {
  this.image = image;
  this.x = x;
  this.y = y;
  this.altura = altura;
  this.largura = largura;
}

Sprite.prototype.desenha = function (xCanvas, yCanvas) {
  ctx.drawImage(
    this.image,
    this.x,
    this.y,
    this.largura,
    this.altura,
    xCanvas,
    yCanvas,
    this.largura,
    this.altura
  );
}