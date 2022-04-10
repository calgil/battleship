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
    this.location = startLocation;
    this.locationArr = [];
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
  };

const startLocation = (grid) => { 
    let random = getRandomInt(grid.length);
     return grid[random].name;
  };

const createFleet = () => {
    fleet.push(new Ship('Patrol Boat', [startLocation(grid)], 2));
    fleet.push(new Ship('Submarine', [startLocation(grid)], 3));
    fleet.push(new Ship('Destroyer', [startLocation(grid)], 3));
    fleet.push(new Ship('Battleship', [startLocation(grid)], 4));
    fleet.push(new Ship('Carrier', [startLocation(grid)], 5));
   }

const findGridIndex = (location) => {
 gridIndex = grid.map(cell => cell.name).indexOf(location);
 return gridIndex;
   }

const pushLocations = () => {
 fleet.forEach(ship => {
     for(let i = 0; i < ship.location.length; i++ ){
         let location = findGridIndex(ship.location[i]);
         while(shipLocations.includes(location)){
             ship.location[i] = startLocation(grid);
         } shipLocations.push(location)
        }
    });
  };

const updateGrid = () => {
  fleet.forEach(ship => {
      index = findGridIndex(...ship.location);
    grid[index].hasShip = true;
   });
 }
 
const randomOrientation = (start, length) => {
  return getRandomInt(2) === 1 ? vertical(start, length) : horizontal(start, length);
 }

function placeShip() {
    fleet.forEach(ship => {
        gridIndex = findGridIndex(ship.location[0]);
        locationArr = randomOrientation(gridIndex, ship.length);
        ship.locationArr = locationArr
    })
}

const horizontal = (start, length) => {
    let locationArray = [];
    while(locationArray.length < length){
        locationArray.push(start)
        start++
    }
    return locationArray;
}

const vertical = (start, length) => {
    let locationArray = [];
    while(locationArray.length < length) {
        locationArray.push(start)
        start += 10;
    }
    return locationArray;
}

const withinGrid = () => {
    fleet.forEach((ship) => {
        ship.locationArr.map((cell) => {
            if(cell > 100){
                ship.location = [startLocation(grid)]
            }
        })
    })
}

const resetShip = (ship) => {
    ship.location = [startLocation(grid)];
    randomOrientation();
}




dynamicGrid(10, 10, rows, columns);

createFleet();

pushLocations();

updateGrid();
// console.log(fleet);

placeShip();
withinGrid();


// randomOrientation();


console.log(fleet);
console.log(grid);
// console.log(shipLocations);