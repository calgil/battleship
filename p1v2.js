let rs = require('readline-sync');

const rows = ['A', 'B', 'C'];

const columns = [1, 2, 3];

const grid = [];

const fleet = [];

// const shipLocations = [];





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
    fleet.push(new Ship('Patrol Boat', 'A1'));
    fleet.push(new Ship('Submarine', 'A1'));
  }

function checkSameLocation(fleet){
    fleet.map((ship) => {
        console.log(ship.location);
    })
}








makeGrid(rows, columns);

createFleet();

checkSameLocation(fleet);



// console.log(checkSameLocation(fleet));
// console.log(fleet);
