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
    this.coordinates = [];
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }

const getRandomInt = (max) =>  { Math.floor(Math.random() * max) };

const startLocation = (grid) => { 
    let random = getRandomInt(grid.length);
     return grid[random];
  };

const createFleet = () => {
    fleet.push(new Ship('Patrol Boat', startLocation(grid), 2));
    fleet.push(new Ship('Submarine', startLocation(grid), 3));
    fleet.push(new Ship('Destroyer', startLocation(grid), 3));
    fleet.push(new Ship('Battleship', startLocation(grid), 4));
    fleet.push(new Ship('Carrier', startLocation(grid), 5));
   }

const findGridIndex = (location) => {
 let gridIndex = grid.map(cell => cell.name).indexOf(location);
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
  }

const shipAssignLocation = (fleet) => {
    fleet.forEach(ship => {
        placeShip(ship);
    })
}

const placeShip = (object) => {
    if(object.coordinates.length === 0){
        gridIndex = findGridIndex(object.location);
        let shipCoordinates = randomOrientation(gridIndex, object.length);
        withinGrid(object);
        object.coordinates = shipCoordinates
    }
    withinGrid(object)
    updateGrid(object);
    checkOverlap(object);
}

const randomOrientation = (start, length) => {
    return getRandomInt(2) === 1 ? 
    vertical(start, length) : horizontal(start, length);
   }

const horizontal = (start, length) => {
    let locationArray = [];
    while(locationArray.length < length){
        locationArray.push(start)
        start++
    }
    if(withinRow(locationArray)){
        return locationArray
    } else {
        locationArray.length = 0;
        locationArray.push(reverseRow(start, length))
    };
    return locationArray.flat();
};

const withinRow = (coordinates) => {
    let row = findRow(coordinates[0])
    let pass = false;
    coordinates.map(index => {
       if (row !== findRow(index)){
          pass = false;
       } 
       else { pass = true}
    })
    return pass
}

const findRow = (index) => {
    let rowName = (grid[index].name).slice(0, 1);
     return rowName
 }

const reverseRow = (start, length) => {
    let rowArray = [];
    while(rowArray.length < length){
        rowArray.push(start);
        start--
     }
     return rowArray;
 }

const vertical = (start, length) => {
    let locationArray = [];
    while(locationArray.length < length) {
        // if(start > 99){
        //     console.log('vertical ruined it');
        //     locationArray.length = 0;
        // }
        locationArray.push(start)
        start += 10;
    }
    return locationArray;
}

const withinGrid = (ship) => {
    ship.coordinates.map(index => {
            if ((index > 99)){
                ship.location = startLocation(grid)
                console.log('here', ship.coordinates);
                resetShip(ship);
                // ship.coordinates.length = 0;
                console.log('after', ship.coordinates);
                placeShip(ship)
            } 
    })
}

const updateGrid = (ship) => {
    console.log('super dumb', ship);
        ship.coordinates.map(location => {
            console.log('dumb', grid[location].hasShip);
            grid[location].hasShip = true;
            console.log('dumb too', grid[location].hasShip);
        })
   }

const checkOverlap = (ship) => {
    ship.coordinates.map(cell => {
        if (grid[cell].hasShip){
            resetShip(ship);
            placeShip(ship);
        } 
    })
}

const resetShip = (ship) => {
    ship.location = startLocation(grid);
    ship.coordinates.length = [];
    placeShip(ship);
}

dynamicGrid(10, 10, rows, columns);

createFleet();

uniqueStartLocations();

shipAssignLocation(fleet);

// withinGrid();

// updateGrid();

// uniqueStartLocations();

// // console.log(fleet);

// // placeShip();










//  updateGrid(); 

console.log(fleet);
console.log(grid);