class Sprite {
  constructor({
    imageSrc,
    position,
    frameRate = 1,
    animations,
    frameBuffer = 5,
    loop,
    autoplay = true,
  }) {
    this.image = new Image();
    // Setting the dimensions of the player to the dimentions of the image
    this.frameRate = frameRate;
    this.image.onload = () => {
      this.loaded = true;
      this.height = this.image.height;
      this.width = this.image.width / this.frameRate;
    };
    this.image.src = imageSrc;

    this.position = position;
    // animatio
    this.currentFrame = 0;
    this.elaspedFrame = 0;
    this.frameBuffer = frameBuffer;
    this.animations = animations;
    if (this.animations) {
      for (let key in this.animations) {
        const image = new Image();
        image.src = this.animations[key].imageSrc;
        this.animations[key].image = image;
      }
    }
    this.frameBuffer = frameBuffer;
    this.loop = loop;
    this.autoplay = autoplay;
    this.currentAnimation;
  }
  draw() {
    if (!this.loaded) return;
    const cropbox = {
      position: {
        x: this.width * this.currentFrame,
        y: 0,
      },
      width: this.width,
      height: this.height,
    };
    this.updateFrames();
    ctx.drawImage(
      this.image,
      cropbox.position.x,
      cropbox.position.y,
      cropbox.width,
      cropbox.height,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  updateFrames() {
    if (!this.autoplay) return;
    this.elaspedFrame++;
    if (this.elaspedFrame % this.frameBuffer === 0) {
      if (this.currentFrame < this.frameRate - 1) this.currentFrame++;
      else if (this.loop) this.currentFrame = 0;
    }
    // Checking that the current sprite does coming with property called "onComplete".
    // Note: this.currentAnimation ===  this.animation["enterDoor"] //true
    if (this.currentAnimation?.onComplete) {
      // When the player entered the door run that function.
      if (
        this.currentFrame === this.frameRate - 1 
        &&
        !this.currentAnimation.isActive
      ) {
        this.currentAnimation.onComplete();
        this.currentAnimation.isActive = true;
      }
    }
  }
  switchSprite(name) {
    if (this.image === this.animations[name].image) return;
    this.currentFrame = 0;
    this.image = this.animations[name].image;
    this.frameBuffer = this.animations[name].frameBuffer;
    this.frameRate = this.animations[name].frameRate;
    this.loop = this.animations[name].loop;
    // Intialising the current animations here.
    this.currentAnimation = this.animations[name];
  }
  play() {
    this.autoplay = true;
  }
}
