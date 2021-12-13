// SEE https://adventofcode.com/2021/day/5 for challenge description

const fs = require("fs");

const dataRaw = fs.readFileSync("./input5.txt", "utf8");
// const dataRaw = fs.readFileSync("./input5-sample.txt", "utf8");
let dataArray = dataRaw.split("\n");
dataArray = dataArray.map((row) => row.split(" -> "));

/* ***************************************************************************** */
// helpers

/* ***************************************************************************** */

let paths = []; // [[count,count], [], ...]]; // aka path[x][y] = count

dataArray.forEach((row) => {
  const start = row[0].split(",").map((x) => parseInt(x));
  const end = row[1].split(",").map((x) => parseInt(x));

  if (start[0] === end[0]) {
    const dirY = start[1] > end[1] ? -1 : 1;
    paths[start[0]] = paths[start[0]] ? paths[start[0]] : [];
    for (let y = start[1]; y !== end[1] + dirY; y += dirY) {
      paths[start[0]][y] = paths[start[0]][y] ? paths[start[0]][y] + 1 : 1;
    }
  }

  if (start[1] === end[1]) {
    const dirX = start[0] > end[0] ? -1 : 1;
    for (let x = start[0]; x !== end[0] + dirX; x += dirX) {
      paths[x] = paths[x] ? paths[x] : [];
      paths[x][start[1]] = paths[x][start[1]] ? paths[x][start[1]] + 1 : 1;
    }
  }
});

let count = paths.reduce((rowCount, row) => {
  return (
    rowCount +
    row.reduce((colCount, col) => {
      return col > 1 ? colCount + 1 : colCount;
    }, 0)
  );
}, 0);

console.log("Day 5 puzzle 1:  ", count); // 7436

/* ***************************************************************************** */

// paths = [];

dataArray.forEach((row) => {
  const start = row[0].split(",").map((x) => parseInt(x));
  const end = row[1].split(",").map((x) => parseInt(x));

  if (start[0] === end[0] || start[1] === end[1]) {
    return;
  }

  const dirX = start[0] > end[0] ? -1 : 1;
  const dirY = start[1] > end[1] ? -1 : 1;

  let x = start[0];
  let y = start[1];

  while (x !== end[0] + dirX || y !== end[1] + dirY) {
    paths[x] = paths[x] ? paths[x] : [];
    paths[x][y] = paths[x][y] ? paths[x][y] + 1 : 1;
    if (x !== end[0] + dirX) {
      x = x + dirX;
    }
    if (y !== end[1] + dirY) {
      y = y + dirY;
    }
  }
});

count = paths.reduce((rowCount, row) => {
  return (
    rowCount +
    row.reduce((colCount, col) => {
      return col > 1 ? colCount + 1 : colCount;
    }, 0)
  );
}, 0);

console.log("Day 5 puzzle 2:  ", count); // 21104
