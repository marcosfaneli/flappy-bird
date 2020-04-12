function RandomColor() {
  this.hex = '0123456789ABCDEF';
  this.color = '#';

  for (var i = 0; i < 6; i++) {
    this.color += this.hex[Math.floor(Math.random() * 16)];
  }
  return this.color;
}