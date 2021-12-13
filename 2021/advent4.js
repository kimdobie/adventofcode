// SEE https://adventofcode.com/2021/day/4 for challenge description

const fs = require("fs");

const dataRaw = fs.readFileSync("./input4.txt", "utf8");
//const dataRaw = fs.readFileSync("./input4-sample.txt", "utf8");
const dataArray = dataRaw.split("\n\n");

const drawnNumbers = dataArray.shift().split(",");

const boards = dataArray.map((board) => {
  return board.split("\n").map((row) => row.split(" ").filter((x) => x !== ""));
});

const checkForWinners = (board) => {
  // check each row!
  let winner = false;
  board.forEach((row) => {
    if (!row.some((num) => num !== "X") && !winner) winner = true;
  });

  // check each column!
  for (let i = 0; i < board[0].length; i++) {
    let nonXFound = false;
    board.forEach((row) => {
      if (row[i] !== "X") nonXFound = true;
    });
    if (!nonXFound) winner = true;
  }

  return winner;
};

const boardTotal = (board) => {
  let total = 0;
  board.forEach((row) => {
    row.forEach((num) => {
      if (num !== "X") {
        total = total + parseInt(num);
      }
    });
  });
  return total;
};

/* ***************************************************************************** */
let winnerIndex = null;
let drawNum = 0;

while (!winnerIndex && drawNum < drawnNumbers.length) {
  boards.forEach((board, index) => {
    board.forEach((row, rowIndex) => {
      boards[index][rowIndex] = row.map((num) =>
        num === drawnNumbers[drawNum] ? "X" : num
      );
    });

    winnerIndex = checkForWinners(board) ? index : winnerIndex;
  });
  drawNum = !winnerIndex ? drawNum : drawNum + 1;
}

// Get total
let total = boardTotal(boards[winnerIndex]);

console.log(
  "Day 4 puzzle 1: Board ",
  winnerIndex,
  " is the winner!! => Total ",
  total,
  " * draw number",
  drawnNumbers[drawNum],
  " = ",
  total * parseInt(drawnNumbers[drawNum])
); // Day 4 puzzle 1: Board  90  is the winner!! => Total  1068  * draw number 10  =  10680

/* ***************************************************************************** */

let losingBoards = [...boards];
drawNum = 0;

while (losingBoards.length > 1 && drawNum < drawnNumbers.length) {
  losingBoards = losingBoards.reduce((checkedBoards, board) => {
    let newBoard = [...board];
    newBoard = newBoard.map((row) =>
      row.map((num) => (num === drawnNumbers[drawNum] ? "X" : num))
    );
    if (!checkForWinners(newBoard)) {
      checkedBoards.push(newBoard);
    }
    return checkedBoards;
  }, []);
  if (losingBoards.length > 1) drawNum = drawNum + 1;
}

// Keep going until the final board has won
let winner = false;
while (!winner) {
  losingBoards[0].forEach((row, rowIndex) => {
    losingBoards[0][rowIndex] = row.map((num) =>
      num === drawnNumbers[drawNum] ? "X" : num
    );
  });
  if (checkForWinners(losingBoards[0])) {
    winner = true;
  } else drawNum = drawNum + 1;
}

// Get total
total = total = boardTotal(losingBoards[0]);

console.log(
  "Day 4 puzzle 2:",
  "  Total ",
  total,
  " * draw number",
  drawnNumbers[drawNum],
  " = ",
  total * parseInt(drawnNumbers[drawNum])
); // Day 4 puzzle 2:   Total  469  * draw number 68  =  31892
