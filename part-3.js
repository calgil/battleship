let rs = require('readline-sync');

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const grid = [];

const fleet = [];

const sunkShips = new Set();

let displayGrid = [];


function Cell(name) {
    this.name = name;
    this.hasShip = false;
    this.hit = false;
    this.miss = false;
  }


const dynamicGrid = (dimension, rows) => {
    let row = rows.slice(0, dimension);
    row.forEach(cell => {
        let rowArr = [];
        for(let i = 1; i <= row.length; i++){
            grid.push(new Cell(`${cell}${i}`));
            rowArr.push(`${cell}${i}`);
            }
            displayGrid.push(rowArr)
        })
      }


const makeDisplayGrid = (rows) => {
    rows.forEach(row =>{
        row = [];
        for(let i = 0; i < rows.length; i++){
            row.push(new Cell(`${row}${i}`))
        }
        console.log(row);
    })
}


function Ship(name, length){
  this.name = name;
  this.startIndex;
  this.coordinates = [];
  this.length = length;
  this.hits = 0;
  this.sunk = false;
}
    
 const getRandomInt = (max) =>  { return Math.floor(Math.random() * max) };
 
 const createFleet = () => {
   fleet.push(new Ship('Patrol Boat', 2));
   fleet.push(new Ship('Submarine', 3));
   fleet.push(new Ship('Destroyer', 3));
   fleet.push(new Ship('Battleship', 4));
   fleet.push(new Ship('Carrier', 5));
  }
    
const vertical = length => {
    let placed = false;
    let locationArray;
    while(!placed){
        locationArray = [];
        let start = getRandomInt(99);
        while(locationArray.length < length){
            locationArray.push(start);
            start += 10;
        }
        if(locationArray.every(withinGrid)) placed = true;
    }
    return locationArray;
}
    
const horizontal = length => {
    let placed = false;
    let locationArray;
    while(!placed) {
        let start = getRandomInt(99);
        locationArray = [];
        while(locationArray.length < length){
            locationArray.push(start);
            start ++;
        }
        if((locationArray.every(withinGrid)) && withinRow(locationArray)) { placed = true } ;
    }
    return locationArray
}
    
const withinGrid = element => element < 99;

const withinRow = (array) => {
    let row = findRow(array[0]);
    let pass = false;
    array.map(index => {
        if (row !== findRow(index)){
            pass = false;
        } else { pass = true;}
    })
    return row, pass
}

const findRow = (index) => {
    let rowName = (grid[index].name).slice(0, 1);
     return rowName
 }

const checkOverlap = array => {
    let placed;
    if(!array.some(overlap)){
        placed = true
        array.forEach(element => grid[element].hasShip = true );
    } else {placed = false };
    return placed;
 }

 const overlap = (element) => grid[element].hasShip;

const genCods = ship => {
   let { coordinates, length} = ship;
   getRandomInt(2) === 1 
       ? (coordinates = vertical( length ))
       : (coordinates = horizontal( length ));
   if(!checkOverlap(coordinates)){
       coordinates = [];
        genCods(ship) };
   coordinates.forEach(coord => ship.coordinates.push(`${grid[coord].name}`));
}

const requestPlayerStrike = () => {
    showGrid();
let playerStrike = rs.question('Enter a location to strike ie \'ie A2\'     ').toUpperCase();
        checkValidStrike(playerStrike)
}

const checkValidStrike = (strike) => {
    let row = strike.slice(0, 1);
    let col = Number(strike.slice(1));
    if((!rows.includes(row) || (col > 10)) || (strike.length > 3 || isNaN(col))){
        console.log('Invalid strike. Please input valid location \'ie\'A2   ');
            requestPlayerStrike();
        } else {
            updateDisplayGrid(row, col, strike)
            recordStrike(strike);
            updateShip(strike);
        }
    }
    
const recordStrike = (strike) => {
    let index = findGridIndex(strike);
    if((grid[index].hasShip) && (!grid[index].hit)){
        grid[index].hit = true;
        console.log('Hit!');
    } else if ((grid[index].hit) || (grid[index].miss)){
            console.log('You have already selected this location. Miss!');
    } else { grid[index].miss = true;
             console.log('Miss!');
        }
}

const updateShip = (strike) => {
    for(const ship of fleet){
         if(ship.coordinates.includes(strike) && ship.hits < ship.length){
             ship.hits ++
         }
         if(ship.hits === ship.length){
             ship.sunk = true;
             sunkShips.add(ship);
         }
    }
}

const findGridIndex = locationName => { 
    let gridIndex = grid.map(cell => cell.name).indexOf(locationName);
    return gridIndex;
};
    
const playBattleShip = () => {
    dynamicGrid( 10, rows);
    createFleet();
    for(const ship of fleet) { genCods(ship) };
    rs.question('Press any key to play battleship  ');
}

const gamePlay = () => {
    while(sunkShips.size < fleet.length){
        requestPlayerStrike();
        if((fleet.length - sunkShips.size) > 0){
            (fleet.length - sunkShips.size) > 1
            ? console.log(`There are ${fleet.length - sunkShips.size} ships remaining`)
            : console.log(`There is ${fleet.length - sunkShips.size} ship remaining`);
        }
    }
}

const showGrid = () => {
    console.log(fleet);
    console.table(displayGrid);
}

const updateDisplayGrid = (row, col, strike) => {
    gridIndex = findGridIndex(strike);
    rowIndex = rows.map(unit => unit).indexOf(row)
    colIndex = (col - 1);
    if(grid[gridIndex].hasShip){
        displayGrid[rowIndex][colIndex] = 'X';
    } else if(!grid[gridIndex].hasShip) {
        displayGrid[rowIndex][colIndex] = 'O';
    }
}

const reset = () => {
    fleet.length = 0;
    sunkShips.clear();
}

playBattleShip();

gamePlay()

let again = rs.keyInYNStrict('You have destroyed all ships would you like to play again?    ')

while(again){
    reset();
    playBattleShip();
    gamePlay();
}

console.log('Thanks for playing! ');