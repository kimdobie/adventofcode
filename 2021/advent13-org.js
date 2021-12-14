// SEE https://adventofcode.com/2021/day/13 for challenge description

const fs = require("fs");

const dataRaw = fs.readFileSync("./input13.txt", "utf8");
// const dataRaw = fs.readFileSync("./input13-sample.txt", "utf8");
let dataArray = dataRaw.split("\n");

const data = dataArray.filter((x) => x.includes(",")).map((x) => x.split(","));
const folds = dataArray
  .filter((x) => x.includes("fold"))
  .map((x) => x.split("="))
  .map((x) => [x[0][x[0].length - 1], x[1]]);

/* ************************************************************************** */

/* ************************************************************************** */

const grid = [];
data.forEach(([x, row]) => {
  if (!grid[row]) grid[row] = [];
  grid[row][x] = "#";
});

let afterFirstFold = [];

let newGrid = [...grid];
folds.forEach(([dir, line]) => {
  const tempGrid = [];
  line = parseInt(line);
  if (dir === "y") {
    newGrid.forEach((row, rowIndex) => {
      if (row) {
        row.forEach((x, xIndex) => {
          if (x === "#") {
            if (rowIndex < line) {
              if (!tempGrid[rowIndex]) tempGrid[rowIndex] = [];
              tempGrid[rowIndex][xIndex] = "#";
            } else if (rowIndex > line) {
              const diff = rowIndex - line;
              const newRow = line - diff;
              if (!tempGrid[newRow]) tempGrid[newRow] = [];
              tempGrid[newRow][xIndex] = "#";
            }
          }
        });
      }
    });
  } else {
    newGrid.forEach((row, rowIndex) => {
      if (row) {
        row.forEach((x, xIndex) => {
          if (x === "#") {
            if (xIndex < line) {
              if (!tempGrid[rowIndex]) tempGrid[rowIndex] = [];
              tempGrid[rowIndex][xIndex] = "#";
            } else if (xIndex > line) {
              const diff = xIndex - line;
              const newX = line - diff;
              if (!tempGrid[rowIndex]) tempGrid[rowIndex] = [];
              tempGrid[rowIndex][newX] = "#";
            }
          }
        });
      }
    });
  }
  if (afterFirstFold.length === 0) afterFirstFold = [...tempGrid];
  newGrid = [...tempGrid];
});

const points = afterFirstFold.reduce((acc, row) => {
  return acc + (row ? row.filter((x) => x === "#").length : 0);
}, 0);

console.log("\nDay13 puzzle 1:  ", points); // Example: 17 , Answer: 818
console.log("***************************************");

/* ***************************************************************************** */

for (let i = 0; i < newGrid.length; i++) {
  let rowString = "";
  for (let j = 0; j < newGrid[i].length; j++) {
    rowString =
      rowString +
      (newGrid[i] && newGrid[i][j] && newGrid[i][j] === "#" ? "#" : " ");
  }
  console.log(rowString);
}
console.log("Day13 puzzle 2:  ", "See above", "\n"); // Example: (does not exist), Answer: LRGPRECB
