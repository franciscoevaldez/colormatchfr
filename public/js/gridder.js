// Grid handling functions

// Setting up a point grid
function mtCreateGridWithSettings(settings){

  var grid = [],
    gridPoints = []
    extraPoints = 2;

  // check optionals
  settings.distance = (settings.distance) ? settings.distance : 20;
  settings.rows     = (settings.rows)     ? settings.rows     : 20;
  settings.columns  = (settings.columns)  ? settings.columns  : 20;
  settings.offsetX  = (settings.offsetX)  ? settings.offsetX  : 0;
  settings.offsetY  = (settings.offsetY)  ? settings.offsetY  : 0;
  settings.angle    = (settings.angle)    ? settings.angle    : 0;
  settings.initial  = (settings.initial)  ? settings.initial  : 5;
  settings.color    = (settings.color)    ? settings.color    : [50,50,50];
  settings.maxSize  = (settings.maxSize)  ? settings.maxSize  : 29;

  settings.offsetX -= settings.distance * 2;
  settings.offsetY -= settings.distance * 2;

  var compensatedRows = settings.rows + extraPoints,
      compensatedCols = settings.columns + extraPoints,
      compensatedOffsetX = settings.offsetX - ((extraPoints/2) * settings.distance),
      compensatedOffsetY = settings.offsetY - ((extraPoints/2) * settings.distance)
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

  var dotSymbol = mtGetDotSymbolForPoint(settings.color, settings.initial, gridPoints[0]);
  var gridDots = mtGetDotsFromSymbol(dotSymbol, gridPoints);
  //var gridDots = mtGetDotsFromPoints(gridPoints, settings.initial);

  grid = {
    points      : gridPoints,
    dots        : gridDots,
    dotSymbol   : dotSymbol,
    maxDotSize  : settings.distance,
    maxSize     : settings.maxSize,
    color       : settings.color,
    angle       : settings.angle,
    initial     : settings.initial
  }

  return grid;

}

function mtGetDotSymbolForPoint(color, initialSize, position){
  var initialDot = new paper.Path.Circle(position, initialSize);
  initialDot.fillColor = new paper.Color(color[0]/255, color[1]/255, color[2]/255);

  var symbol = new paper.Symbol(initialDot);
  return symbol;
}

function mtGetDotsFromSymbol(symbol, points){
  var dots = [];

  for (var i = 0; i < points.length; i++) {
    var aCircle = symbol.place(points[i]);
    dots.push(aCircle);
  }

  return dots;
}

/*
function mtGetDotsFromPoints(points, initialSize){
  // get grid points
  var dots = [],
    firstCircle = new paper.Path.Circle(points[0], initialSize);

  dots.push(firstCircle);

  for (var i = 0; i < points.length; i++) {
    //var aCircle = new paper.Path.Circle(points[i], initialSize);
    var aCircle = firstCircle.clone()
    aCircle.position = points[i];
    dots.push(aCircle)
  }

  return dots;
}
*/

// Create the grid as a group and add them to the view
function mtDisplayGrid(grid){
  var gridGroup = new paper.Group(grid.dots);
  //gridGroup.fillColor = new paper.Color(grid.color[0]/255, grid.color[1]/255, grid.color[2]/255);
  gridGroup.blendMode = 'multiply';
  gridGroup.rotate(grid.angle);
}

function mtResizeGrid(grid,size){
  var dotSymbol     = grid.dotSymbol,
      maxSize       = grid.maxSize,
      currentSize   = dotSymbol.definition.bounds.width,
      targetSize    = size * maxSize,
      delta         = targetSize / currentSize;

  if (size == 0) {
    dotSymbol.definition.opacity = 0;
  } else {
    if (dotSymbol.definition.opacity == 0) {
      dotSymbol.definition.opacity = 1;
    }
    dotSymbol.definition.scale(delta);
  }

  paper.view.update();

  /*
  var gridDots      = grid.dots,
      maxSize       = grid.maxSize,
      currentSize   = gridDots[0].bounds.width,
      targetSize    = size * maxSize,
      delta         = targetSize / currentSize;

  if (size == 0) {
    gridDots[0].opacity = 0;
  } else {
    if (gridDots[0].opacity == 0) {
      gridDots[0].opacity = 1;
    }
    gridDots[0].scale(delta);
  }

  paper.view.update();
  */

}
