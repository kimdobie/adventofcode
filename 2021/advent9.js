// SEE https://adventofcode.com/2021/day/9 for challenge description

const fs = require("fs");

const dataRaw = fs.readFileSync("./input9.txt", "utf8");
// const dataRaw = fs.readFileSync("./input9-sample.txt", "utf8");
let dataArray = dataRaw.split("\n");

dataArray = dataArray.map((x) => x.split(""));
dataArray = dataArray.map((x) => x.map((y) => parseInt(y)));

/* ***************************************************************************** */

/* ***************************************************************************** */

const lowPoints = [];
const lowPointLocations = [];

dataArray.forEach((row, i) => {
  row.forEach((point, j) => {
    if (dataArray[i - 1] === undefined || dataArray[i - 1][j] > point) {
      // up
      if (dataArray[i + 1] === undefined || dataArray[i + 1][j] > point) {
        // down
        if (dataArray[i][j - 1] === undefined || dataArray[i][j - 1] > point) {
          // left
          if (
            dataArray[i][j + 1] === undefined ||
            dataArray[i][j + 1] > point
          ) {
            // right
            lowPointLocations.push([i, j]);
            lowPoints.push(point);
          }
        }
      }
    }
  });
});

const count = lowPoints.reduce((acc, b) => acc + b + 1, 0);
console.log("Day 9 puzzle 1:  ", count); //2, 1, 6, and 6 => 15
console.log("\n *************************************** \n");

/* ***************************************************************************** */

const basinSizes = [];

lowPointLocations.forEach(([i, j]) => {
  const basinLocations = [];
  const locationsToTest = [[i, j]];

  while (locationsToTest.length > 0) {
    const [i, j] = locationsToTest.shift();

    const value = dataArray[i][j];

    basinLocations.push(`${i}${j}`); // this is to make removing dups easier below

    if (
      dataArray[i - 1] !== undefined &&
      dataArray[i - 1][j] !== 9 &&
      dataArray[i - 1][j] > value
    )
      locationsToTest.push([i - 1, j]); // up

    if (
      dataArray[i + 1] !== undefined &&
      dataArray[i + 1][j] !== 9 &&
      dataArray[i + 1][j] > value
    )
      locationsToTest.push([i + 1, j]); // down

    if (
      dataArray[i][j - 1] !== undefined &&
      dataArray[i][j - 1] !== 9 &&
      dataArray[i][j - 1] > value
    )
      locationsToTest.push([i, j - 1]); // left

    if (
      dataArray[i][j + 1] !== undefined &&
      dataArray[i][j + 1] !== 9 &&
      dataArray[i][j + 1] > value
    )
      locationsToTest.push([i, j + 1]); // right
  }

  let uniqueArray = [...new Set(basinLocations)]; // remove dups
  basinSizes.push(uniqueArray.length);
});

basinSizes.sort((a, b) => b - a);

// only take 3 largest basins (assume that there are at least 3)
console.log("Day 9 puzzle 2:  ", basinSizes[0] * basinSizes[1] * basinSizes[2]); // 1019700

//9 * 14 * 9 = 1134
