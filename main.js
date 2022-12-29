const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");

canvas.width = 1024; /* 64 * 16*/
canvas.height = 576; /* 64 * 9 */
// parsedCollisions storing an array of sub-arrays representing a row in our map.
let parsedCollisions;
// collisionBlocks is storing an array of CollisionBlock objects
let collisionBlocks;

let backgroundLevel;
let doors;
let currentLevel = 1;
let scoreIncreaser = [];
let player = new Player({
  collisionBlocks,
  scoreIncreaser,
  frameRate: 11,
  imageSrc: "./img/king/idle.png",
  loop: false,
  position: {
    x: 200,
    y: 250,
  },
  animations: {
    idle: {
      frameRate: 11,
      loop: true,
      frameBuffer: 4,
      imageSrc: "./img/king/idle.png",
    },
    idleLeft: {
      frameRate: 11,
      loop: true,
      frameBuffer: 4,
      imageSrc: "./img/king/idleLeft.png",
    },
    runRight: {
      frameRate: 8,
      loop: true,
      frameBuffer: 4,
      imageSrc: "./img/king/runRight.png",
    },
    runLeft: {
      frameRate: 8,
      loop: true,
      frameBuffer: 4,
      imageSrc: "./img/king/runLeft.png",
    },
    doorEnter: {
      frameRate: 8,
      loop: false,
      frameBuffer: 4,
      imageSrc: "./img/king/enterDoor.png",
      onComplete: () => {
        console.log("completed animation");
        gsap.to(overlay, {
          opacity: 1,
          onComplete: () => {
            currentLevel++;

            if (currentLevel === 4) currentLevel = 1;
            levels[currentLevel].init();
            player.switchSprite("idle");
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            });
          },
        });
      },
    },
  },
});
const levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2d();
      [collisionBlocks, pallets] = parsedCollisions.createObjectFrom2D();
      player.scoreIncreaser = pallets;
      if (player.currentAnimation) player.currentAnimation.isActive = false;
      backgroundLevel = new Sprite({
        imageSrc: "./img/backgroundLevel1.png",
        position: { x: 0, y: 0 },
      });
      player.collisionBlocks = collisionBlocks;
      doors = [
        new Sprite({
          imageSrc: "./img/doorOpen.png",
          position: { x: 768, y: 268 },
          frameRate: 5,
          frameBuffer: 9,
          loop: false,
          autoplay: false,
        }),
      ];
    },
  },
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2d();
      console.log(parsedCollisions);
      [collisionBlocks, pallets] = parsedCollisions.createObjectFrom2D();
      player.scoreIncreaser = pallets;

      if (player.currentAnimation) player.currentAnimation.isActive = false;
      backgroundLevel = new Sprite({
        imageSrc: "./img/backgroundLevel2.png",
        position: { x: 0, y: 0 },
      });
      doors = [
        new Sprite({
          imageSrc: "./img/doorOpen.png",
          position: { x: 772, y: 335 },
          frameRate: 5,
          frameBuffer: 9,
          loop: false,
          autoplay: false,
        }),
      ];
      player.position = { x: 100, y: 250 };
      player.preventInput = false;
      player.collisionBlocks = collisionBlocks;
    },
  },
  3: {
    init: () => {
      parsedCollisions = collisionsLevel3.parse2d();
      [collisionBlocks, pallets] = parsedCollisions.createObjectFrom2D();
      player.scoreIncreaser = pallets;

      if (player.currentAnimation) player.currentAnimation.isActive = false;
      backgroundLevel = new Sprite({
        imageSrc: "./img/backgroundLevel3.png",
        position: { x: 0, y: 0 },
      });
      doors = [
        new Sprite({
          imageSrc: "./img/doorOpen.png",
          position: { x: 175, y: 335 },
          frameRate: 5,
          frameBuffer: 9,
          loop: false,
          autoplay: false,
        }),
      ];
      player.position = { x: 150, y: 250 };
      player.preventInput = false;
      player.collisionBlocks = collisionBlocks;
    },
  },
};
const overlay = {
  opacity: 0,
};
const keys = {
  w: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};

function animate() {
  
  requestAnimationFrame(animate);
  player.velocity.x = 0;

  if (keys.a.pressed) {
    player.switchSprite("runLeft");
    player.velocity.x = -10;
  } else if (keys.d.pressed) {
    player.switchSprite("runRight");
    player.velocity.x = +10;
  }
  backgroundLevel.draw();
  doors.forEach((door) => {
    door.draw();
  });
  player.scoreIncreaser.forEach((pallet) => {
    pallet.draw();
  });
  ctx.save();
  ctx.fillStyle = "black";
  ctx.globalAlpha = overlay.opacity;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  player.draw();
  player.update();
}

levels[currentLevel].init();
animate();
