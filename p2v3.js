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

function Ship(name, startLocation, length){
    this.name = name;
    this.startIndex = startLocation;
    this.coordinates = [];
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

const getRandomInt = (max) =>  { return Math.floor(Math.random() * max) };

const createFleet = () => {
  fleet.push(new Ship('Patrol Boat', getRandomInt(99), 2));
  fleet.push(new Ship('Submarine', getRandomInt(99), 3));
  fleet.push(new Ship('Destroyer', getRandomInt(99), 3));
  fleet.push(new Ship('Battleship', getRandomInt(99), 4));
  fleet.push(new Ship('Carrier', getRandomInt(99), 5));
 }

const vertical = (start, length) => {
    let locationArray = [];
    while(locationArray.length < length){
        locationArray.push(start);
        start += 10;
    }
    withinGrid(locationArray);
    return locationArray;
}

const horizontal = (start, length) => {
    let locationArray = [];
    while(locationArray.length < length){
        locationArray.push(start);
        start ++;
    }
    withinGrid(locationArray);
    withinRow(locationArray);
    return locationArray;
}

const withinGrid = (arr) => {
    arr.map(coordinate => {
        if (coordinate > 99){
            arr.length = 0;
        }
    })
}

const withinRow = (coordinates) => {
    let row = findRow(coordinates[0])
    let pass = false;
    coordinates.map(index => {
        if(row !== findRow(index)){
            pass = false;
        } else {pass = true;}
    })
}

const findRow = (index) => {
    let rowName = (grid[index].name).slice(0, 1);
     return rowName
 }

dynamicGrid(10, 10, rows, columns);
createFleet();

for(const ship of fleet){
    let { name, startIndex, coordinates, length} = ship
    if(ship.coordinates.length === 0){
        getRandomInt(2) === 1 ?
        coordinates = vertical(startIndex, length) : coordinates = horizontal(startIndex, length);
    }
    console.log(coordinates.length);
    ship.coordinates = coordinates


    console.log('name', name, ship);
    console.log('start',startIndex);
    console.log('coords',coordinates);
}

// console.log(fleet);
// console.log(grid[102]);
// console.table(grid);