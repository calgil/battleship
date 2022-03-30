let rs = require('readline-sync');

let gameOver = false;
let counter = 0;

const rows = ['A', 'B', 'C'];
const columns = [1, 2, 3];

const grid = [];

const fleet = [];

let again;

// const sunkShips = [];

let playerStrike;

function Cell(row, col) {
  this.row = row;
  this.col = Number( col);
  this.name = `${row}${col}`
};

const makeGrid = (rows, cols) => {
    const cells = [];
    rows.forEach((row) => {
        for(let i = 0; i < cols.length; i++){
        cells.push(new Cell(`${row}`,`${cols[i]}`))
      };
    });
    return grid.push(cells)
};

function Ship(name, location){
  this.name = name;
  this.location = location;
  this.length = 1;
  this.sunk = false;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};

const placeShip = () => {
  let row = getRandomInt(rows.length)
  let col = getRandomInt(columns.length)
  return `${rows[row]}${columns[col]}`
};

fleet.push(new Ship('Patrol Boat', (placeShip(rows, columns))));
fleet.push(new Ship('Submarine', (placeShip(rows, columns))));

function checkSameLocation(fleet) {
  while (fleet[0].location === fleet[1].location){
    fleet[1].location = (placeShip(rows, columns));
  }; 
};

function startGame(){
makeGrid(rows, columns);
checkSameLocation(fleet);
}

const requestNextStrike = () => {
  playerStrike = rs.question('Enter a location to strike ie \'ie A2\'  ');
}

const checkHit = (fleet) => {
  for(let i = 0; i < fleet.length; i++){
    if(playerStrike.toUpperCase() === fleet[i].location){
      fleet[i].sunk = true;
      counter++;
       console.log('hit', counter);
    } else { console.log('miss');}
 }
}

const isGameOver = (counter, fleet) => {
  if(counter === fleet.length){
    gameOver = true;
    console.log(`function ${gameOver}`);
  }
}

// const checkGameOver = (fleet) => {
//   let isGameOver = false;
//   if(counter === fleet.length){
//     fleet.forEach(element => {
//       if (element.sunk = true){
//         console.log(`${element} is sunk`);
//       } if (element.sunk = false) {
//         console.log(`${element} remains`);
//         isGameOver = false;
//       };
//     });
//   };
//   console.log('end ');
//   // gameOver = true;
// };


const playerTurn = () => {
  requestNextStrike();
  checkHit(fleet);
}

function playBattleShip(){
  gameOver = false;
  startGame();
  rs.question('Press any key to play Battleship   ');
  while(!gameOver){
    playerTurn();
    isGameOver(counter, fleet);
  }
}

console.log(fleet);

playBattleShip();

// rs.question('Press any key to play BattleShip   ');

// startGame();

//  while (!gameOver){

//   playerTurn();
//   // checkGameOver(fleet);
//   // isGameOver(counter, fleet)

//   console.log(gameOver);

//  }

rs.keyInYN('You have destroyed all battleships. Would you like to play again?  ');
again = rs.keyInYN()
 console.log(again);

 if(again = true){
   gameOver = false;
   console.log('Final log', gameOver);
 }

 if(again = true){
   startGame()
 } else if(again = true){
   console.log('Good day!');
 } else {
   console.log('Please choose Y/N');
 }

