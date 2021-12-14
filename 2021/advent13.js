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

const grid = data.reduce((acc, [x, row]) => {
  if (!acc[row]) acc[row] = [];
  acc[row][x] = "#";
  return acc;
}, []);

/* ************************************************************************** */

const processGrid = (newGrid, dir, line) => {
  const tempGrid = [];

  newGrid.forEach((row, rowIndex) => {
    if (row) {
      row.forEach((x, xIndex) => {
        if (x === "#") {
          const index = dir === "y" ? rowIndex : xIndex;
          const newCords =
            dir === "y" ? [rowIndex, xIndex] : [xIndex, rowIndex];
          // Add row if it doesn't exist
          if (!tempGrid[rowIndex]) tempGrid[rowIndex] = [];

          if (index < line) {
            // less than fold = just copy to tempGrid
            tempGrid[rowIndex][xIndex] = "#";
          } else if (index > line) {
            // fold into existing
            const diff = index - line;
            const newCoord = line - diff;
            if (dir === "y") {
              if (!tempGrid[newCoord]) tempGrid[newCoord] = [];
              tempGrid[newCoord][xIndex] = "#";
            } else {
              tempGrid[rowIndex][newCoord] = "#";
            }
          }
        }
      });
    }
  });

  return tempGrid;
};
/* ************************************************************************** */

let afterFirstFold = []; // This is needed for part 1

let newGrid = [...grid];
folds.forEach(([dir, line]) => {
  line = parseInt(line);
  newGrid = processGrid(newGrid, dir, line);
  if (afterFirstFold.length === 0) afterFirstFold = [...newGrid];
});

const points = afterFirstFold.reduce(
  (acc, row) => acc + (row ? row.filter((x) => x === "#").length : 0),
  0
);

console.log("\nDay13 puzzle 1:  ", points); // Example: 17 , Answer: 818
console.log("***************************************");

/* ***************************************************************************** */

for (let i = 0; i < newGrid.length; i++) {
  if (newGrid[i] && newGrid[i].length > 0) {
    let rowString = "";
    for (let j = 0; j < newGrid[i].length; j++) {
      rowString +=
        newGrid[i] && newGrid[i][j] && newGrid[i][j] === "#" ? "#" : " ";
    }
    console.log(rowString);
  }
}
console.log("Day13 puzzle 2:  ", "See above", "\n"); // Example: (does not exist), Answer: LRGPRECB
