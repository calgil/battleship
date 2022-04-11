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
  };

 

// This kinda works

// const updateGrid = () => {
//   fleet.map((ship) => {
//       ship.coordinates.map(location => {
//           grid[location].hasShip = true;
//       })
//   })
//  }
 



//  Ahhhhhhh!!!!! This is where the problem is happening. Maybe I need to make a 
// fukkin function that resets the ship and call that when shit is fucked

const shipAssignLocation = (fleet) => {
    fleet.forEach(ship => {
        placeShip(ship);
    })
}
const placeShip = (ship) => {
    gridIndex = findGridIndex(ship.location);
    let shipCoordinates = randomOrientation(gridIndex, ship.length);
    if(shipCoordinates.length === undefined){
        ship.location = startLocation(grid)
        placeShip(ship)
        console.log('moved', ship);
    }
    withinGrid(shipCoordinates);
    ship.coordinates = shipCoordinates
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
    };
    
    return locationArray;
}
//  I keep getting an error when calling find row within this function
// not sure if it is running twice or not tho

const withinRow = (coordinates) => {
    let row = findRow(coordinates[0])
    console.log(row);
    let pass = false;
    coordinates.map(index => {
       if (row !== findRow(index)){
           console.log('false');
          pass = false;
       } 
       else { console.log('true');
           pass = true}
    })
    return pass
}

const findRow = (index) => {
    let rowName = (grid[index].name).slice(0, 1);
     return rowName
 }

const vertical = (start, length) => {
    let locationArray = [];
    while(locationArray.length < length) {
        locationArray.push(start)
        start += 10;
    }
    return locationArray;
}




// This needs work. I need to reset any ship that fucks the system
const withinGrid = () => {
    fleet.map(ship => {
        for (const element of ship.coordinates){
            if ((element > 100)){
                ship.location = startLocation(grid)
                ship.coordinates.length = 0;
                placeShip(ship)
            } 
        }
    })
}


// This sucks

const resetShip = () => {
    fleet.forEach((ship) => {
        if (ship.coordinates.length === undefined){
            console.log('reset the fukkas');
        }
    })
}




dynamicGrid(10, 10, rows, columns);

createFleet();

uniqueStartLocations();

shipAssignLocation(fleet);



// // console.log(fleet);

// // placeShip();








 withinGrid();

//  updateGrid(); 

console.log(fleet);
// console.log(grid);