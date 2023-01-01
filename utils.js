//This code below, will transform an array to an array which will contain x sub-arrays of 16 elements which represents each block in the map.

Array.prototype.parse2d = function () {
  const rows = [];
  for (let i = 0; i < this.length; i += 16) {
    rows.push(this.slice(i, i + 16));
  }
  return rows;
};

// Function below will return an array which contains pushed instance of pushed class "CollisionBlock"
Array.prototype.createObjectFrom2D = function () {
  const collisionBlocks = [];
  const pallets = [];
  // this keyword here refers to the array on which this function will be called
  this.forEach((row, y) => {
    row.forEach((symbol, x) => {
      // Push a new collision into collisionBlock array if
      if (symbol === 292 || symbol === 250) {
        collisionBlocks.push(
          new CollisionBlock({
            position: {
              x: 64 * x,
              y: 64 * y,
            },
          })
        );
      } else if (symbol === "p") {
        pallets.push(
          new Pallet({
            position: {
              x: 64 * x,
              y: 64 * y + 20,
            },
            imageSrc: "../../img/Coin_Gems/MonedaD.png",
            frameRate: 5,
            frameBuffer: 5,
          })
        );
      } else if (symbol === "b") {
        pallets.push(
          new Pallet({
            position: {
              x: 64 * x,
              y: 64 * y + 12,
            },
            imageSrc: "../../img/game_items_pack/PNG/32px/bomb.png",
            // frameRate: 5,
            // frameBuffer: 5,
          })
        );
      }
    });
  });
  return [collisionBlocks, pallets];
};
