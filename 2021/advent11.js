// SEE https://adventofcode.com/2021/day/11 for challenge description

const fs = require("fs");

const dataRaw = fs.readFileSync("./input11.txt", "utf8");
// const dataRaw = fs.readFileSync("./input11-sample.txt", "utf8");
let dataArray = dataRaw.split("\n");
dataArray = dataArray.map((x) => {
  const row = x.split("");
  return row.map((y) => parseInt(y));
});

/* ************************************************************************** */

const incrementNeighbors = (row, index, array) => {
  for (let r = row - 1; r <= row + 1; r++) {
    for (let i = index - 1; i <= index + 1; i++) {
      if (array[r] && array[r][i] && array[r][i] !== 0) array[r][i]++;
    }
  }
};

const countNeedsToFlash = (array) => {
  return array.reduce((flash, row) => {
    return flash + row.filter((x) => x > 9).length;
  }, 0);
};

const countFlashes = (array) => {
  return array.reduce((flash, row) => {
    return flash + row.filter((x) => x === 0).length;
  }, 0);
};

const setBoard = (array) => {
  array = array.map((row) => row.map((x) => x + 1));

  let stepFlash = countNeedsToFlash(array);

  // Resolve all flashes
  while (stepFlash > 0) {
    array.forEach((row, i) => {
      row.forEach((num, x) => {
        if (num > 9) {
          array[i][x] = 0;
          incrementNeighbors(i, x, array);
        }
      });
    });
    stepFlash = countNeedsToFlash(array);
  } // end while
  return array;
};

const areSame = (array) => {
  const first = array[0].join("");

  for (let i = 1; i < array.length; i++) {
    if (array[i].join("") !== first) return false;
  }
  return true;
};
/* ************************************************************************** */

count = 0;
let newData = [...dataArray];

let totalFlash = 0;
while (count < 100) {
  newData = setBoard(newData);
  totalFlash = totalFlash + countFlashes(newData);
  count = count + 1;
}

console.log("Day11 puzzle 1:  ", totalFlash); // Example: 1656 , Answer: 1637
console.log("***************************************");

/* ***************************************************************************** */

let step = 0;

let stepArray = [...dataArray];

while (areSame(stepArray) === false) {
  stepArray = setBoard(stepArray);
  step = step + 1;
}

console.log("Day11 puzzle 2:  ", step); // Example: 195, Answer: 242
