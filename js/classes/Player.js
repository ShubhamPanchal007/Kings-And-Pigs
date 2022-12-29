class Player extends Sprite {
  constructor({
    collisionBlocks = [],
    imageSrc,
    frameRate,
    animations,
    loop,
    position,
    scoreIncreaser,
  }) {
    super({ imageSrc, frameRate, animations, loop });
    this.position = position;
    this.velocity = { x: 0, y: 0 };
    this.height;
    this.width;
    this.maxJumpLimit = 100;
    this.sides = {
      bottom: this.position.y + this.height,
    };
    this.gravity = 1;
    this.collisionBlocks = collisionBlocks;
    this.animations = animations;
    this.loop = loop;
    this.scoreIncreaser = scoreIncreaser;
  }

  update() {
    this.position.x += this.velocity.x;
    this.hitbox = {
      position: {
        x: this.position.x + 60,
        y: this.position.y + 35,
      },
      height: 45,
      width: 50,
    };

    this.checkVerticalCollisionWithPallets();
    // this.checkHorizontalCollisionsWithPallets();
    this.checkHorizontalCollisions();
    this.applyGravity();
    this.hitbox = {
      position: {
        x: this.position.x + 60,
        y: this.position.y + 35,
      },
      height: 52,
      width: 50,
    };

    // ctx.fillStyle = "rgba(0,0,255,0.5)";
    // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    this.checkVerticalCollision();
  }
  checkHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.x < 0) {
          const offset = this.hitbox.position.x - this.position.x;
          this.position.x =
            collisionBlock.position.x + collisionBlock.width - offset + 0.01;
          break;
        }
        if (this.velocity.x > 0) {
          const offset =
            this.hitbox.position.x - this.position.x + this.hitbox.width;
          this.position.x = collisionBlock.position.x - offset - 0.01;
          break;
        }
      }
    }
  }
  checkVerticalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        this.hitbox.position.x + this.hitbox.width >=
          collisionBlock.position.x &&
        this.hitbox.position.x <=
          collisionBlock.position.x + collisionBlock.width &&
        this.hitbox.position.y + this.hitbox.height >=
          collisionBlock.position.y &&
        this.hitbox.position.y <=
          collisionBlock.position.y + collisionBlock.height
      ) {
        if (this.velocity.y < 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y + collisionBlock.height - offset + 0.01;
          // this.hitbox.position.y = this.position.y;
          break;
        }
        if (this.velocity.y > 0) {
          this.velocity.y = 0;
          const offset = this.hitbox.position.y - this.position.y;
          this.position.y =
            collisionBlock.position.y - this.hitbox.height - offset - 0.01;
          // this.hitbox.position.y = this.position.y;
          break;
        }
      }
    }
  }

  checkVerticalCollisionWithPallets() {
    this.scoreIncreaser?.forEach((pallet, i) => {
      if (
        this?.hitbox?.position?.y + this?.hitbox?.height >=
          pallet.position.y + 15 &&
        this?.hitbox?.position?.y <= pallet.position.y + 15 + pallet.height &&
        this?.hitbox.position?.x + this?.hitbox.width >= pallet.position.x &&
        this?.hitbox.position?.x <= pallet.position.x + pallet.width
      ) {
        this.scoreIncreaser.splice(i, 1);
      }
    });
  }
  applyGravity() {
    this.velocity.y += this.gravity;
    this.position.y += this.velocity.y;
  }
}
