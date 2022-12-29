class Pallet {
  constructor({ position, radius }) {
    this.position = position;
    this.radius = radius;
    this.height = 10;
    this.width = 10;
  }
  draw() {
    // ctx.beginPath();
    // ctx.arc(this.position.x, this.position.y+14, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.position.x, this.position.y+15, this.width, this.height);
    // ctx.fill();
    // ctx.closePath();
  }
}
