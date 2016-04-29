// Grid handling functions


// Setting up a point grid
function mtCreateGrid(rows, columns, distance){

  var gridArray = [];

  // assume default of 10
  if (!rows) { rows = 10 }
  if (!columns) { columns = 10 }
  if (!distance) { distance = 10 }

  // loop for row
  for (var rC = 0; rC < rows; rC++) {
    // loop for columns
    for (var cC = 0; cC < columns; cC++) {
      var newPoint = new paper.Point(distance * rC, distance * cC);
      gridArray.push(newPoint);
    }

  }

  return gridArray;

}

// Create dots for a grid
function mtCreateHalfToneForGrid(grid, initialSize){

  // if no grid, return nil
  if (!grid) {
    console.log('grid missing');
    return nil
  }
  // if no size, asume 10
  if (!initialSize) { initialSize = 10 }

  for (var i = 0; i < grid.length; i++) {
    var aCircle = new paper.Path.Circle(grid[i], 8);
    aCircle.fillColor = 'blue';
  }

}
