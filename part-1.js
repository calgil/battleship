let rs = require('readline-sync');

const rows = ['A', 'B', 'C'];

const columns = [1, 2, 3];

const grid = [];

const fleet = [];

const shipLocations = new Set();

const pastPlayerStrikes = [];

const sunkShips = new Set();

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
    fleet.push(new Ship('Patrol Boat', placeShip()));
    fleet.push(new Ship('Submarine', placeShip()));
  }

const locationCheck = (fleet) =>{
    for(let i = 1; i<fleet.length; i++){
        if(fleet[i-1].location === fleet[i].location){
            if(placeShip() != fleet[i-1].location){
                fleet[i].location = placeShip();
            }else{fleet[i].location = placeShip();}
        };
    };
};

function playBattleShip(){
    createFleet();
    locationCheck(fleet);
    locationCheck(fleet);
    // rs.question('Press any key to play Battleship   ');
}

function requestNextStrike() {
    playerStrike = rs.question('Enter a location to strike ie \'ie A2\'  ').toUpperCase();
    errorHandleStrike(playerStrike, rows, columns);
    if(pastPlayerStrikes.length < 1){
        pastPlayerStrikes.push(playerStrike)
        addHit(fleet, playerStrike);
        reportHit(fleet, playerStrike);
    } else{ checkSameStrikeLocation(pastPlayerStrikes, playerStrike) }
    checkSink(fleet);
  }

const errorHandleStrike = (strike, row, col) => {
    let strikeRow = strike.slice(0, 1);
    let strikeCol = Number(strike.slice(1));
    let valid = row.includes(strikeRow)
    let validCol = col.includes(strikeCol);
    if(!valid || !validCol){
        console.log('Invalid strike. Please input valid location \'ie\'A2   ' );
        requestNextStrike();
    }  
}

const checkSameStrikeLocation = (pastStrikes, strike) => {
    let repeat = pastStrikes.includes(strike);
    if(repeat){
        console.log('Already selected that location. Miss!  ');
    } else {pastPlayerStrikes.push(strike)
        addHit(fleet, playerStrike);
        reportHit(fleet, playerStrike); }
}

const addHit = (fleet, strike) => {
    fleet.forEach((ship) => {
        if(ship.location === strike){
            ship.hits++
        }
    })
}

const reportHit = (fleet, strike) => {
    fleet.forEach((ship) => shipLocations.add(ship.location))
    if(shipLocations.has(strike)){
        console.log('Hit!');
    } else{console.log('Miss');}
} 

const checkSink = (fleet) => {
    for (let i = 0; i < fleet.length; i++){
        if(fleet[i].hits === fleet[i].length){
            sunkShips.add(fleet[i])
            fleet[i].sunk = true;
        }
    }
}

const reset = () => {
    fleet.length = 0;
    shipLocations.clear();
    pastPlayerStrikes.length = 0;
    sunkShips.clear();
}

makeGrid(rows, columns);

console.log(grid);

// playBattleShip();

// while(sunkShips.size < fleet.length){
//     requestNextStrike(); 
// }

// if (sunkShips.size === fleet.length){
//     console.log('You have destroyed all ships');
// }

// let again = rs.keyInYN('Would you like to play again?   ')

// while(again){
//     reset();
//     playBattleShip();
//     while(sunkShips.size < fleet.length){
//         requestNextStrike(); 
//     }
//     if (sunkShips.size === fleet.length){
//         console.log('You have destroyed all ships');
//     }
//     again = rs.keyInYN('Would you like to play again?   ')
// }