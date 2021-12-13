// First attempt - it works but not real pretty - keeping to show refactoring

const fs = require("fs");

const dataRaw = fs.readFileSync("./input11.txt", "utf8");
// const dataRaw = fs.readFileSync("./input11-sample.txt", "utf8");
let dataArray = dataRaw.split("\n");
dataArray = dataArray.map((x) => {
  const row = x.split("");
  return row.map((y) => parseInt(y));
});

/* ************************************************************************** */

count = 0;

let newData = [...dataArray];
// console.log("STARTING DATA", newData);

let totalFlash = 0;
while (count < 100) {
  // increase each by 1
  newData = newData.map((row) => row.map((x) => x + 1));

  let stepFlash = newData.reduce((flash, row) => {
    return flash + row.filter((x) => x > 9).length;
  }, 0);

  // totalFlash = totalFlash + stepFlash;

  while (stepFlash > 0) {
    newData.forEach((row, i) => {
      row.forEach((num, x) => {
        if (num > 9) {
          newData[i][x] = 0;
          //  totalFlash = totalFlash + 1;
          // TOP ROW
          if (
            newData[i - 1] &&
            newData[i - 1][x - 1] &&
            newData[i - 1][x - 1] !== 0
          )
            newData[i - 1][x - 1]++;
          if (newData[i - 1] && newData[i - 1][x] && newData[i - 1][x] !== 0)
            newData[i - 1][x]++;
          if (
            newData[i - 1] &&
            newData[i - 1][x + 1] &&
            newData[i - 1][x + 1] !== 0
          )
            newData[i - 1][x + 1]++;

          // MIDDLE ROW
          if (newData[i][x - 1] && newData[i][x - 1] !== 0) newData[i][x - 1]++;
          if (newData[i][x + 1] && newData[i][x + 1] !== 0) newData[i][x + 1]++;

          // BOTTOM ROW
          if (
            newData[i + 1] &&
            newData[i + 1][x - 1] &&
            newData[i + 1][x - 1] !== 0
          )
            newData[i + 1][x - 1]++;
          if (newData[i + 1] && newData[i + 1][x] && newData[i + 1][x] !== 0)
            newData[i + 1][x]++;
          if (
            newData[i + 1] &&
            newData[i + 1][x + 1] &&
            newData[i + 1][x + 1] !== 0
          )
            newData[i + 1][x + 1]++;
        }
      });
    });
    stepFlash = newData.reduce((flash, row) => {
      return flash + row.filter((x) => x > 9).length;
    }, 0);
  } // end while

  //console.log("END OF STEP", newData);
  const zeroCount = newData.reduce((flash, row) => {
    return flash + row.filter((x) => x === 0).length;
  }, 0);
  totalFlash = totalFlash + zeroCount;
  count = count + 1;
}

// console.log("NEW DATA: ", newData);
console.log("Day11 puzzle 1:  ", totalFlash); // Example: 1656 , Answer:
console.log("***************************************");

/* ***************************************************************************** */

const areSame = (array) => {
  const first = array[0].join("");

  for (let i = 1; i < array.length; i++) {
    if (array[i].join("") !== first) return false;
  }
  return true;
};

let step = 0;

let stepArray = [...dataArray];

while (areSame(stepArray) === false) {
  console.log("starting step", step);
  // increase each by 1
  stepArray = stepArray.map((row) => row.map((x) => x + 1));

  let stepFlash = stepArray.reduce((flash, row) => {
    return flash + row.filter((x) => x > 9).length;
  }, 0);

  // totalFlash = totalFlash + stepFlash;

  while (stepFlash > 0) {
    stepArray.forEach((row, i) => {
      row.forEach((num, x) => {
        if (num > 9) {
          stepArray[i][x] = 0;
          //  totalFlash = totalFlash + 1;
          // TOP ROW
          if (
            stepArray[i - 1] &&
            stepArray[i - 1][x - 1] &&
            stepArray[i - 1][x - 1] !== 0
          )
            stepArray[i - 1][x - 1]++;
          if (
            stepArray[i - 1] &&
            stepArray[i - 1][x] &&
            stepArray[i - 1][x] !== 0
          )
            stepArray[i - 1][x]++;
          if (
            stepArray[i - 1] &&
            stepArray[i - 1][x + 1] &&
            stepArray[i - 1][x + 1] !== 0
          )
            stepArray[i - 1][x + 1]++;

          // MIDDLE ROW
          if (stepArray[i][x - 1] && stepArray[i][x - 1] !== 0)
            stepArray[i][x - 1]++;
          if (stepArray[i][x + 1] && stepArray[i][x + 1] !== 0)
            stepArray[i][x + 1]++;

          // BOTTOM ROW
          if (
            stepArray[i + 1] &&
            stepArray[i + 1][x - 1] &&
            stepArray[i + 1][x - 1] !== 0
          )
            stepArray[i + 1][x - 1]++;
          if (
            stepArray[i + 1] &&
            stepArray[i + 1][x] &&
            stepArray[i + 1][x] !== 0
          )
            stepArray[i + 1][x]++;
          if (
            stepArray[i + 1] &&
            stepArray[i + 1][x + 1] &&
            stepArray[i + 1][x + 1] !== 0
          )
            stepArray[i + 1][x + 1]++;
        }
      });
    });
    stepFlash = stepArray.reduce((flash, row) => {
      return flash + row.filter((x) => x > 9).length;
    }, 0);
  } // end while

  step = step + 1;
}

console.log("ARE SAME: ", step);

console.log("Day11 puzzle 2:  ", "not done"); // Example: , Answer:
