addEventListener("keydown", ({ key }) => {
  if (player.preventInput) return;
  switch (key) {
    case "ArrowUp":
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i];

        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0;
          player.velocity.y = 0;
          player.preventInput = true;
          player.switchSprite("doorEnter");
          door.play();
          return;
        }
      }
      if (player.velocity.y === 0) player.velocity.y = -30;

      break;

    case "ArrowLeft":
      console.log("kjsdf")
      keys.a.pressed = true;
      break;

    case "ArrowRight":
      keys.d.pressed = true;
      break;
  }
});
addEventListener("keyup", ({ key }) => {
  switch (key) {
    case "ArrowLeft":
      keys.a.pressed = false;
      player.switchSprite("idleLeft");
      break;

    case "ArrowRight":
      keys.d.pressed = false;
      player.switchSprite("idle");
      break;
  }
});
