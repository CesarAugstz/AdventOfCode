const LIM_MIN = 200000000000000;
const LIM_MAX = 400000000000000;

type info = {
  posX: number;
  posY: number;
  velX: number;
  velY: number;
};

function advance(info: info): info {
  info.posX += info.velX;
  info.posY += info.velY;
  return info
}

function readData(): string[] {
  const path = "../data";
  const fs = require("fs");
  const data = fs.readFileSync(path, "utf8").trim();
  const lines = data.split("\n");
  return lines;
}

function splitInfo(line: string): info {
  const [positions, vel] = line.split("@");

  const [posX, posY] = positions.split(",").map((x) => Number(x.trim()));

  const [velX, velY] = vel.split(",").map((x) => Number(x.trim()));

  return {
    posX,
    posY,
    velX,
    velY,
  };
}

function crashed(info1: info, info2: info): boolean {
  if (
    info1.posX <= LIM_MIN ||
    info1.posY >= LIM_MAX ||
    info2.posX <= LIM_MIN ||
    info2.posY >= LIM_MAX
  )
    return false;

  if (info1.posX === info2.posX || info1.posY === info2.posY) return true;

  return false;
}

function main() {
  let crash = 0;

  const data = readData();
  console.log("data", data);

  for (let i = 0; i <= data.length; i++) {
    console.log('i: ', i)
    const line = data[i];

    let info1 = splitInfo(line);

    for (let j = i+1; j <= data.length; j++) {
      console.log('advance j -------------------------------------------------')
      console.log('j: ', j)
      let info2 = splitInfo(data[j]);

      while (
        info1.posX > LIM_MIN ||
        info1.posY < LIM_MAX ||
        info2.posX > LIM_MIN ||
        info2.posY < LIM_MAX
      ) {
        if (crashed(info1, info2)) {
          crash++;
          console.log("crash", { info1, info2 });
        }
        console.log('pos before advance', {info1, info2})

        info1 = advance(info1);
        info2 = advance(info2);
        console.log('pos after advance', {info1, info2})
      }
    }
  }
  console.log("crash times: ", crash);
}

main();
