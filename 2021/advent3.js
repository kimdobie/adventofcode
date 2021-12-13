// SEE https://adventofcode.com/2021/day/3 for challenge description

const fs = require("fs");

const dataRaw = fs.readFileSync("./input3.txt", "utf8");
const data = dataRaw.split("\n");

let newGammaBinary = "";
let newEpsilonBinary = "";

const half = data.length / 2;

for (let i = 0; i < data[0].length; i++) {
  const oneCount = data.filter((num) => num.charAt(i) === "1").length;
  newGammaBinary = `${newGammaBinary}${oneCount >= half ? "1" : "0"}`;
  newEpsilonBinary = `${newEpsilonBinary}${oneCount < half ? "1" : "0"}`;
}

const gamma = parseInt(newGammaBinary, 2);
const epsilon = parseInt(newEpsilonBinary, 2);

console.log("Day 3 puzzle 1: ", gamma, " * ", epsilon, " = ", gamma * epsilon); // Example:  , Answer: 1458194

/* ***************************************************************************** */

let oxygenArray = [...data];
let oxygenPosition = 0;

while (oxygenArray.length > 1) {
  const posValue =
    oxygenArray.filter((number) => number.charAt(oxygenPosition) === "1")
      .length >=
    oxygenArray.length / 2
      ? "1"
      : "0";

  oxygenArray = oxygenArray.filter(
    (number) => number.charAt(oxygenPosition) === posValue
  );
  oxygenPosition = oxygenPosition + 1;
}

let scrubberArray = [...data];
let scrubberPosition = 0;

while (scrubberArray.length > 1) {
  const posValue =
    scrubberArray.filter((number) => number.charAt(scrubberPosition) === "1")
      .length <
    scrubberArray.length / 2
      ? "1"
      : "0";

  scrubberArray = scrubberArray.filter(
    (number) => number.charAt(scrubberPosition) === posValue
  );
  scrubberPosition = scrubberPosition + 1;
}

const oxygen = parseInt(oxygenArray[0], 2);
const scrubber = parseInt(scrubberArray[0], 2);

console.log(
  "Day 3 puzzle 2: ",
  oxygen,
  " * ",
  scrubber,
  " = ",
  oxygen * scrubber
); // Example:  , Answer: 2829354
