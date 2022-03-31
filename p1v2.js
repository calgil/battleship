let rs = require('readline-sync');

const rows = ['A', 'B', 'C'];

const columns = [1, 2, 3];

const grid = [];






const makeGrid = (row, col) => {
     row.forEach(cell => {
         for(let i = 0; i<col.length; i++){
             grid.push(`${cell}${col[i]}`);
         }
     });
}

makeGrid(rows, columns);

console.log(grid);
