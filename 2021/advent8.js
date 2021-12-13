// SEE https://adventofcode.com/2021/day/8 for challenge description

const fs = require("fs");

const dataRaw = fs.readFileSync("./input8.txt", "utf8");
// const dataRaw = fs.readFileSync("./input8-sample.txt", "utf8");
let dataArray = dataRaw.split("\n");

// console.log(dataArray[0].split(" | ")[1].split(" ")[0].length);
// console.log(dataArray);
/* ***************************************************************************** */

/* ***************************************************************************** */
// 1 (2), 4 (4), 7 (3), or 8 (7) appear

const count = dataArray.reduce((runCount, line) => {
  const lineCount = line
    .split(" | ")[1]
    .split(" ")
    .reduce((lcount, word) => {
      const l = word.length;
      const add = l === 2 || l === 4 || l === 3 || l === 7 ? 1 : 0;
      return lcount + add;
    }, 0);
  return runCount + lineCount;
}, 0);

console.log("Day 8 puzzle 1:  ", count); // 321

/* ***************************************************************************** */

const count2 = dataArray.reduce((runCount, line) => {
  const [signal, entry] = line.split(" | ");
  let cf = [];
  let bd = [];

  signal.split(" ").forEach((s) => {
    if (s.length === 2) {
      cf = s.split("");
    }
    if (s.length === 4) {
      bd = s.split("");
    }
  });
  bd = bd.filter((bdentry) => bdentry !== cf[0] && bdentry !== cf[1]);

  const entryVal = entry.split(" ").reduce((entryString, word) => {
    const l = word.length;
    let str = "";

    switch (l) {
      case 2:
        str = "1";
        break;
      case 3:
        str = "7";
        break;
      case 4:
        str = "4";
        break;
      case 7:
        str = "8";
        break;
      case 5:
        if (word.includes(cf[0]) && word.includes(cf[1])) {
          str = "3";
        } else if (word.includes(bd[0]) && word.includes(bd[1])) {
          str = "5";
        } else {
          str = "2";
        }
        break;
      case 6:
        if (!(word.includes(cf[0]) && word.includes(cf[1]))) {
          str = "6";
        } else if (word.includes(bd[0]) && word.includes(bd[1])) {
          str = "9";
        } else {
          str = "0";
        }
        break;
    }
    return entryString + str;
  }, "");

  return runCount + parseInt(entryVal);
}, 0);

console.log("Day 8 puzzle 2:  ", count2); // 1028926
