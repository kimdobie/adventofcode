// SEE https://adventofcode.com/2021/day/7 for challenge description

const fs = require("fs");

const dataRaw = fs.readFileSync("./input7.txt", "utf8");
// const dataRaw = fs.readFileSync("./input7-sample.txt", "utf8");
let dataArray = dataRaw
  .split(",")
  .map((num) => parseInt(num))
  .sort((a, b) => a - b);

/* ***************************************************************************** */
const end = dataArray[dataArray.length - 1];

/* ***************************************************************************** */

let getMin;

for (let i = 0; i <= end; i++) {
  let sum = 0;
  dataArray.forEach((num) => {
    const diff = Math.abs(num - i);
    sum += diff;
  });
  if (!getMin) getMin = sum;
  getMin = Math.min(getMin, sum);
}

console.log("Day 7 puzzle 1:  ", getMin); // 344605

/* ***************************************************************************** */
getMin = undefined;

const diff = (start, end) => {
  const steps = Math.abs(start - end);
  let sum = 0;
  for (let i = 1; i <= steps; i++) {
    sum = sum + i;
  }
  return sum;
};

for (let i = 0; i <= end; i++) {
  let sum = 0;
  dataArray.forEach((num) => {
    sum += diff(num, i);
  });
  if (!getMin) getMin = sum;
  getMin = Math.min(getMin, sum);
}

console.log("Day 7 puzzle 2:  ", getMin); // 93699985
