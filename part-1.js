let rs = require('readline-sync');

// var gameOver;
// let counter = 0;

const gameStatus = {
  // counter: 0,
  gameOver: false,
};

const rows = ['A', 'B', 'C'];
const columns = [1, 2, 3];

const grid = [];

const pastPlayerStrikes = [];

const fleet = [];

let again;

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
  this.hits = 0;
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

// error handling for player strike need to make sure row comes first then column
// I'm debating just mapping through the grid to see if the playerStrike exists there...
// const regex = /[A-C]/g;

// const isStrikeValid = (strike) => {
//   pastPlayerStrikes.push(strike)
//   row = strike.slice(0, 1);
//   col = strike.slice(1);
//   if(row.match(regex) === regex){
//     console.log('Valid Row');
//   }
//   console.log(row);
//   console.log(col);
//   console.log('check strike ',strike);
// }

// let's try it another way

const strikeWithinGrid = (strike, grid) => {
  row = strike.slice(0, 1);
  col = strike.slice(1);
  grid.forEach((cell) => {
    console.log(cell.row);
  })
}

const checkHit = (fleet) => {
  for(let i = 0; i < fleet.length; i++){
    if(playerStrike.toUpperCase() === fleet[i].location){
      fleet[i].hits++
      console.log('hit ', fleet[i].hits);
    } else { console.log('miss');}
 }
}


// Not producing desired outcome idk 

const checkSink = (fleet) => {
  fleet.forEach((ship) => {
    if(ship.hits === ship.length){
      ship.sunk = true;
      console.log(`${ship.name} has been sunk`);
    } else {console.log(`${ship.name} floats`);}
  })
}

// const checkGameStatus = (fleet) => {
//   let counter = 0;
//   fleet.forEach((ship) => {
//     if(ship.sunk = true){
//       counter ++
//     } else{console.log(`${ship.name} still floats`);}
//   })
//   if(counter === fleet.length){
//     gameStatus.gameOver = true;
//     console.log(`Game Over`);
//   }
// }

function playBattleShip(){
  startGame();
  rs.question('Press any key to play Battleship   ');
}

const playerTurn = () => {
  requestNextStrike();
  checkHit(fleet);
  checkSink(fleet);
}



console.log(fleet);

playBattleShip();


startGame();

playerTurn();

strikeWithinGrid(playerStrike, grid);


console.log(pastPlayerStrikes);
// console.log(typeof(grid));



//  while (!gameStatus.gameOver){

//   playerTurn();
//   // checkGameStatus();


//  }

// rs.keyInYN('You have destroyed all battleships. Would you like to play again?  ');

// function playAgain(value) {
//   if (value = true){

//   }
// }


// again = rs.keyInYN()
//  console.log(again);

//  if(again = true){
//    gameOver = false;
//    console.log('Final log', gameOver);
//  }

//  if(again = true){
//    startGame()
//  } else if(again = true){
//    console.log('Good day!');
//  } else {
//    console.log('Please choose Y/N');
//  }





// console.log(gameStatus);