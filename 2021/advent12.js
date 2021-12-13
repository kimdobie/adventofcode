// SEE https://adventofcode.com/2021/day/12 for challenge description

const fs = require("fs");

const dataRaw = fs.readFileSync("./input12.txt", "utf8");
// const dataRaw = fs.readFileSync("./input12-sample.txt", "utf8");
let dataArray = dataRaw.split("\n").map((x) => x.split("-"));

const connections = {}; // list of possible paths
dataArray.forEach((con) => {
  const first = con[0];
  const second = con[1];
  if (!connections[first]) connections[first] = [];
  if (!connections[second]) connections[second] = [];

  connections[first].push(second);
  connections[second].push(first);
});

// console.log(connections);

/* ************************************************************************** */

const getPath = (cave, paths, canVisitSmall = false, path = []) => {
  let newPath = [...path, cave];

  if (cave === "end") {
    paths.push(newPath);
    return;
  }

  connections[cave].forEach((c) => {
    if (c === c.toUpperCase() || !newPath.includes(c)) {
      getPath(c, paths, canVisitSmall, newPath);
    } else if (canVisitSmall && c !== "start" && c !== "end") {
      getPath(c, paths, false, newPath);
    }
  });
};

/* ************************************************************************** */

/*
starting at "start" - to through each path


*/

const paths = [];
getPath("start", paths);
console.log("Day12 puzzle 1:  ", paths.length); // Example: 10 , Answer: 3563
console.log("***************************************");

/* ***************************************************************************** */
const morePaths = [];
getPath("start", morePaths, true);
console.log("Day12 puzzle 2:  ", morePaths.length); // Example: 36 , Answer: 105453
