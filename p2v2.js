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
    this.cords = [];
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
    fleet.push(new Ship('Patrol Boat', startLocation(grid), 2));
    fleet.push(new Ship('Submarine', startLocation(grid), 3));
    fleet.push(new Ship('Destroyer', startLocation(grid), 3));
    fleet.push(new Ship('Battleship', startLocation(grid), 4));
    fleet.push(new Ship('Carrier', startLocation(grid), 5));
   }

const findGridIndex = (location) => {
 gridIndex = grid.map(cell => cell.name).indexOf(location);
 return gridIndex;
   }

const uniqueStartLocations = () => {
 fleet.forEach(ship => {
     let location = findGridIndex(ship.location)
     if(shipLocations.length = 0){
        shipLocations.push(location)
     } else if (shipLocations.includes(location)){
         ship.location = startLocation(grid)
     } shipLocations.push(location)
    })
  };

const updateGrid = () => {
  fleet.forEach(ship => {
      index = findGridIndex(...ship.location);
    grid[index].hasShip = true;
   });
 }
 
const randomOrientation = (start, length) => {
  return getRandomInt(2) === 1 ? 
  vertical(start, length) : horizontal(start, length);
 }



const placeShip = (ship) => {
    gridIndex = findGridIndex(ship.location);
    console.log(gridIndex);
    // locationArr = randomOrientation(gridIndex, ship.length);
    // ship.cords = locationArr
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
    fleet.map(ship => {
        for (const element of ship.cords){
            if (element > 100){
                ship.location = startLocation(grid)
                ship.cords.length = 0;
                placeShip(ship)
                console.log(ship);
            } else {console.log(`within grid`);}
        }
    })
}

const resetShip = (ship) => {
    ship.location = [startLocation(grid)];
    randomOrientation();
}




dynamicGrid(10, 10, rows, columns);

createFleet();

uniqueStartLocations();

// // updateGrid();
// // console.log(fleet);

// // placeShip();
// withinGrid();


for (const ship of fleet){
    placeShip(ship);
 }

// randomOrientation();

// console.log(findGridIndex('B2'));

console.log(fleet);
// console.log(grid);
// console.log(shipLocations);