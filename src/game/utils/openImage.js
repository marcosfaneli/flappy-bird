function openImage(src) {
  this.image = new Image();
  this.image.src = src;  

  return this.image;
}