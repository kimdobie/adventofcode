// SEE https://adventofcode.com/2021/day/10 for challenge description

const fs = require("fs");

const dataRaw = fs.readFileSync("./input10.txt", "utf8");
// const dataRaw = fs.readFileSync("./input10-sample.txt", "utf8");
let dataArray = dataRaw.split("\n");

const corruptPoints = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const missingPoints = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

const matches = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};
let corruptSum = 0; // later turn this into a reducer
const incompleteLines = dataArray.filter((line) => {
  const lineArray = line.split("");

  let corruptLine = false;
  const runningArray = [];
  lineArray.forEach((char) => {
    if (!corruptLine) {
      if (char === "(" || char === "[" || char === "{" || char === "<")
        runningArray.push(char);
      else {
        const last = runningArray.pop();
        if (matches[last] !== char) {
          corruptLine = true;
          corruptSum = corruptSum + corruptPoints[char];
        }
      }
    }
  });
  return !corruptLine;
});

console.log("Day10 puzzle 1:  ", corruptSum); // Example: 26397, Answer: 388713
console.log("***************************************");

/* ***************************************************************************** */
const points = incompleteLines.reduce((sum, line) => {
  const lineArray = line.split("");
  const runningArray = [];
  lineArray.forEach((char) => {
    if (char === "(" || char === "[" || char === "{" || char === "<")
      runningArray.push(char);
    else {
      runningArray.pop();
    }
  });
  runningArray.reverse();

  const missingSum = runningArray.reduce((sum, char) => {
    sum = sum * 5;
    sum = sum + missingPoints[char];
    return sum;
  }, 0);
  sum.push(missingSum);

  return sum;
}, []);

points.sort((a, b) => a - b);
const middle = Math.floor(points.length / 2);

console.log("Day10 puzzle 2:  ", points[middle]); // Example: 288957, Answer: 3539961434
