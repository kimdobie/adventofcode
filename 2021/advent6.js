// SEE https://adventofcode.com/2021/day/6 for challenge description

const fs = require("fs");

const dataRaw = fs.readFileSync("./input6.txt", "utf8");
//const dataRaw = fs.readFileSync("./input6-sample.txt", "utf8");
let dataArray = dataRaw.split(",").map((num) => parseInt(num));

/* ***************************************************************************** */
// helpers

const countFish = (days) => {
  const countArray = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // number of fish in each "count"

  dataArray.forEach((fish) => {
    countArray[fish]++;
  });

  for (let i = 0; i < days; i++) {
    const newFish = countArray[0];

    for (let j = 0; j < 8; j++) {
      countArray[j] = countArray[j + 1];
    }
    countArray[8] = newFish;
    countArray[6] = countArray[6] + newFish;
  }

  return countArray.reduce((acc, curr) => acc + curr);
};

/* ***************************************************************************** */

console.log("Day 6 puzzle 1:  ", countFish(80)); // 349549

/* ***************************************************************************** */

console.log("Day 6 puzzle 2:  ", countFish(256)); // 1589590444365
