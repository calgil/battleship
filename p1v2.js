let rs = require('readline-sync');

const rows = ['A', 'B', 'C'];

const columns = [1, 2, 3];

const grid = [];

const fleet = new Set();

const pastPlayerStrikes = new Set();

let playerStrike;

const sunkShips = new Set();

const shipLocations = [];


const makeGrid = (row, col) => {
     row.forEach(cell => {
         for(let i = 0; i<col.length; i++){
             grid.push(`${cell}${col[i]}`);
         }
     });
}

function Ship(name, location){
    this.name = name;
    this.location = location;
    this.length = 1;
    this.hits = 0;
    this.sunk = false;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  };

  const placeShip = () => {
      let row = getRandomInt(rows.length);
      let col = getRandomInt(columns.length);
      return `${rows[row]}${columns[col]}`
  }

  const createFleet = () => {
    fleet.add(new Ship('Patrol Boat', 'A2'));
    fleet.add(new Ship('Submarine', 'A2'));
  }

// All because of sets!! Yay

// function logSetElements(value1, value2, set) {
//     console.log(value1, value2, set);
// }



// const sameLocation = (fleet) => {
//     let shipLocations = new Set();
//     for(let ship of fleet.entries()){
//         shipLocations.add(ship.location)
//     }
//     return console.log(shipLocations);
// }

//   function checkSameLocation(fleet){
//   for(let i = 1; i < fleet.length; i++){
//       if(fleet[i-1].location === fleet[i].location){
//           fleet[i].location = placeShip();
//       }
//   }
// }

function confirmSameLocation(fleet){
    for(let i = 1; i < fleet.length; i++){
        if(fleet[i-1].location === fleet[i].location){
            checkSameLocation(fleet);
        }
    }
}

function playBattleShip(){
    makeGrid(rows, columns);
    createFleet();
    // sameLocation();
    // checkSameLocation(fleet);
    // confirmSameLocation(fleet);
    rs.question('Press any key to play Battleship   ');
  }

function requestNextStrike() {
    playerStrike = rs.question('Enter a location to strike ie \'ie A2\'  ').toUpperCase();
    errorHandleStrike(playerStrike, rows, columns);
  }

const errorHandleStrike = (strike, row, col) => {
    let strikeRow = strike.slice(0, 1);
    let strikeCol = Number(strike.slice(1));
    let valid = row.includes(strikeRow)
    let validCol = col.includes(strikeCol);
    if(!valid || !validCol){
        console.log('Invalid strike please input location ie \'ie\'A2   ' );
        requestNextStrike();
    } else{ pastPlayerStrikes.add(playerStrike)}
    checkSameStrikeLocation(pastPlayerStrikes, playerStrike);
}

const checkSameStrikeLocation = (pastStrikes, strike) => {
    let repeat = pastStrikes.has(strike);
    if(repeat){ console.log('You have already picked this location. Miss!');}
}

const addHit = (fleet, strike) => {
    fleet.forEach((ship) => {
        if(ship.location === strike){
            ship.hits++
        }
    })
}

const reportHit = (fleet, strike) => {
    let shipLocations = new Set();
    for(let item of fleet){
        shipLocations.add(item.location)
    }
    if(shipLocations.has(strike)){
        console.log('Hit!');
    }else{console.log('Miss!')}
}

const checkSink = (fleet) => {
    for(let ship of fleet){
        if(ship.hits === ship.length){
            ship.sunk = true;
            sunkShips.add(ship)
        }
    }
}

playBattleShip();


    fleet.forEach(ship => {
        shipLocations.push(ship.location)
    })


console.log(shipLocations);

// while(sunkShips.size < fleet.size){
//     requestNextStrike();

//     addHit(fleet, playerStrike);
//     reportHit(fleet, playerStrike);
//     console.log(pastPlayerStrikes);

//     checkSink(fleet);
// }


// if(sunkShips.size = fleet.length){
//     console.log('You have destroyed all ships!  ');
// }
// let again = rs.keyInYN('Would you like to play again?   ')

// if(again){
//     sunkShips.clear();
//     fleet.clear();
//     playBattleShip();
//     console.log(fleet);
// } else{console.log('All done');}

// console.log(sunkShips);

// console.log(pastPlayerStrikes);
