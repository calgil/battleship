let rs = require('readline-sync');

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const columns = [1, 2, 3, 4, 5, 6, 7, 8, 9 , 10];

const grid = [];

const fleet = [];

// Convert grid into an array of objects. For each cell make values like hasShip: true hit: true miss:true


const dynamicGrid = (rowNum, colNum, rows, columns) => {
    let row = rows.slice(0, rowNum);
    let col = columns.slice(0, colNum);
    row.forEach(cell => {
        for(let i = 0; i < col.length; i++){
            grid.push(`${cell}${col[i]}`);
        }
    })
  }

function Ship(name, location, length){
    this.name = name;
    this.location = location;
    this.length = length;
    this.hits = 0;
    this.sunk = false;
}

const startLocation = (grid) => { 
    let random = Math.floor(Math.random() * grid.length);
    return grid[random];
};

const createFleet = () => {
    fleet.push(new Ship('Patrol Boat', startLocation(grid), 2));
    fleet.push(new Ship('Submarine', startLocation(grid), 3));
    fleet.push(new Ship('Destroyer', startLocation(grid), 3));
    fleet.push(new Ship('Battleship', startLocation(grid), 4));
    fleet.push(new Ship('Carrier', startLocation(grid), 5));
  }


  dynamicGrid(5, 5, rows, columns);

  createFleet();

//   startLocation(grid);

  console.log(fleet);

  console.log(grid);