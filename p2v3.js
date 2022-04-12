let rs = require('readline-sync');

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10];

const grid = [];

const fleet = [];

const shipLocations = [];

function Cell(name) {
    this.name = name;
    this.hasShip = false;
    this.hit = false;
    this.miss = false;
  }

const dynamicGrid = (rowNum, colNum, rows, columns) => {
  let row = rows.slice(0, rowNum);
  let col = columns.slice(0, colNum);
  row.forEach(cell => {
      for(let i = 0; i < col.length; i++){
          grid.push(new Cell(`${cell}${col[i]}`));
          }
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
    array.forEach(element => {
        if(!(grid[element].hasShip)){
            grid[element].hasShip = true;
            placed = true;
        }else if(grid[element].hasShip = true){
            placed = false;
        }
    })
    return placed;
 }

const genCods = ship => {
   let { name, coordinates, length} = ship;
   getRandomInt(2) === 1 
       ? (coordinates = vertical( length ))
       : (coordinates = horizontal( length ));
   if(!checkOverlap(coordinates)){ genCods(ship) };
   
   ship.coordinates = coordinates;
}

dynamicGrid(10, 10, rows, columns);
createFleet();

for(const ship of fleet) {
    genCods(ship);
}





console.log(fleet);
// console.log(grid);
// console.table(grid);
