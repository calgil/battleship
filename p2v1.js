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
      let location = findGridIndex([...ship.location])
      while(shipLocations.includes(location)){
        ship.location.push(startLocation(grid)) 
      } 
      shipLocations.push(location)
    });
  };

  // By making ship.location an array I fucked this part too

  const updateGrid = () => {
    fleet.forEach(ship => {
      grid[findGridIndex([...ship.location])].hasShip = true;
    });
  }

  // Pretty sure I just made a mess from here ***

  const randomOrientation = () => {
    let vertical = getRandomInt(2);
    let pos = getRandomInt(2);
    if(vertical === 1 && pos === 1){
      shipPlacement('vertical', 'pos')
    } else if(vertical === 1 && pos === 0){
      shipPlacement('vertical', 'neg')
    } else if (vertical === 0 && pos === 1){
      shipPlacement('horizontal', 'pos')
    } else { shipPlacement('horizontal', 'neg')}
  }

  // Gotta try to do it by two values

  const shipPlacement = (direction, value) => {
    if (direction === 'vertical'){
      if(value === 'pos'){
        console.log('vertical pos');
      } else {console.log('vertical neg');}
    } else {
      if(value === 'pos'){
        console.log('Horizontal Pos');
      }else { console.log('Horizontal neg')}
    }
  }

  // definitely to here ***

  
// const shipPlacement = () => {
//   fleet.forEach(ship => {
//    let startLocation = findGridIndex(ship.location)
//   })
// }      

    function horizontal(gridIndex, length) {
      let direction = getRandomInt(2);
      if(direction === 1){
        for(let i = 0; i < length; i++){
          gridIndex--
          console.log('Horizontal', grid[gridIndex]);
        }
      } else{
        for(let i = 0; i < length; i++){
          gridIndex++
          console.log('Other Direction', grid[gridIndex]);
        }
      }
    }

  //   function vertical(gridIndex, length) {
  //     let direction = getRandomInt(2);
  //     if(direction === 1){
  //       for(let i = 0; i < length; i++){
  //         gridIndex += 10
  //         console.log('Vertical +', grid[gridIndex]);
  //       }
  //     } else {
  //       for(let i = 0; i < length; i++){
  //         gridIndex -= 10;
  //         console.log('Vertical -', grid[gridIndex]);
  //       }
  //     }
  //   }


  // const shipOrientation = (start, length) => {
  //   let rowOrColumn = getRandomInt(2);
  // if(rowOrColumn === 1){
  //   horizontal(start, length);
  //   let pos = getRandomInt(2);
  //   if(pos === 1) {
//     horizontal(start, length,)
  //   } else {horizontal(start, length,)}
  // }else{
  //   vertical(start, length);
  // }
  // }

  // const placeShip = (fleet) => {
  //   fleet.forEach((ship) => {
  //     length = ship.length;
  //     location = findGridIndex(ship.location);
  //     while(!grid[location].hasShip){
  //       grid[location].hasShip = true;
  //       // console.log(grid[location]);
  //     }
  //     shipOrientation(location, length);
  //   })
  // }


  // And most likely here ***
  

  dynamicGrid(10, 10, rows, columns);

  createFleet();
  pushLocations();

  updateGrid();

  // randomOrientation();

  // findGridIndex('B3')
 
  // placeShip(fleet);
  // shipOrientation();

  console.log(fleet);

  // placeShip(fleet);

  console.log(grid);

  // console.log(shipLocations);