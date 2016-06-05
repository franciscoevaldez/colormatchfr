// Grid handling functions

// Setting up a point grid
function mtCreateGridWithSettings(settings){

  var grid = [],
    gridPoints = [];

  // check optionals
  settings.distance = (settings.distance) ? settings.distance : 20;
  settings.rows     = (settings.rows)     ? settings.rows     : 20;
  settings.columns  = (settings.columns)  ? settings.columns  : 20;
  settings.offsetX  = (settings.offsetX)  ? settings.offsetX  : 0;
  settings.offsetY  = (settings.offsetY)  ? settings.offsetY  : 0;
  settings.angle    = (settings.angle)    ? settings.angle    : 0;
  settings.initial  = (settings.initial)  ? settings.initial  : 5;
  settings.color    = (settings.color)    ? settings.color    : [50,50,50];
  settings.maxSize  = (settings.maxSize)  ? settings.maxSize  : 28;

  var compensatedRows = settings.rows + 10,
      compensatedCols = settings.columns + 10,
      compensatedOffsetX = settings.offsetX - (5 * settings.distance),
      compensatedOffsetY = settings.offsetY - (5 * settings.distance)
  ;

  for (var rC = 0; rC < compensatedRows; rC++) {
    // loop for columns
    for (var cC = 0; cC < compensatedCols; cC++) {

      var newX = (settings.distance * rC) + compensatedOffsetX,
        newY = (settings.distance * cC) + compensatedOffsetY,
        newPoint = new paper.Point(newX, newY);

      gridPoints.push(newPoint);

    }

  }

  var gridDots = mtGetDotsFromPoints(gridPoints, settings.initial);

  grid = {
    points      : gridPoints,
    dots        : gridDots,
    maxDotSize  : settings.distance,
    maxSize     : settings.maxSize,
    color       : settings.color,
    angle       : settings.angle,
    initial     : settings.initial
  }

  return grid;

}

function mtGetDotsFromPoints(points, initialSize){
  // get grid points
  var dots = [];

  for (var i = 0; i < points.length; i++) {
    var aCircle = new paper.Path.Circle(points[i], initialSize);
    dots.push(aCircle)
  }

  return dots;
}

// Create the grid as a group and add them to the view
function mtDisplayGrid(grid){
  var gridGroup = new paper.Group(grid.dots);
  gridGroup.fillColor = new paper.Color(grid.color[0]/255, grid.color[1]/255, grid.color[2]/255);
  gridGroup.blendMode = 'multiply';
  gridGroup.rotate(grid.angle);
}

function mtResizeGrid(grid,size){
  var gridDots      = grid.dots,
      maxSize       = grid.maxSize,
      currentSize   = gridDots[0].bounds.width,
      targetSize    = size * maxSize,
      delta         = targetSize / currentSize;

  for (var dC = 0; dC < gridDots.length; dC++) {
    if (size == 0) {
      gridDots[dC].opacity = 0;
    } else {
      if (gridDots[dC].opacity == 0) {
        gridDots[dC].opacity = 1;
      }
      gridDots[dC].scale(delta);
    }
  }

  paper.view.update();

}
