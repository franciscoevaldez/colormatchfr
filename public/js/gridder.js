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

  //mtCheckSettingsDefaults(settings);

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

  /*
  // loop for row
  for (var rC = 0; rC < settings.rows; rC++) {
    // loop for columns
    for (var cC = 0; cC < settings.columns; cC++) {

      var newX = (settings.distance * rC) + settings.offsetX,
        newY = (settings.distance * cC) + settings.offsetY,
        newPoint = new paper.Point(newX, newY);

      gridPoints.push(newPoint);

    }

  }
  */

  var gridDots = mtGetDotsFromPoints(gridPoints, settings.initial);
  //var gridGroup = mtGetGroupFromDots(gridPoints, settings.color, settings.angle);

  grid = {
    points      : gridPoints,
    dots        : gridDots,
    //group       : gridGroup,
    //settings    : settings,
    maxDotSize  : settings.distance,
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

function mtGetGroupFromDots(dots, color, angle){
  var gridGroup = new paper.Group(dots);
  gridGroup.fillColor = new paper.Color(color[0]/255, color[1]/255, color[2]/255);
  gridGroup.rotate(angle);
  return gridGroup;
}

// Create the grid as a group and add them to the view
function mtDisplayGrid(grid){
  var gridGroup = new paper.Group(grid.dots);
  gridGroup.fillColor = new paper.Color(grid.color[0]/255, grid.color[1]/255, grid.color[2]/255);
  gridGroup.blendMode = 'multiply';
  gridGroup.rotate(grid.angle);
}

/*
// Creates the dots and returns them as an array
function mtCreateDotsForGrid(grid, initialSize){
  // get grid points
  var gridPoints = grid.points,
      dots = [];

  for (var i = 0; i < gridPoints.length; i++) {
    var aCircle = new paper.Path.Circle(gridPoints[i], initialSize);
    dots.push(aCircle)
  }

  return dots;

}




// Create dots for a grid
function mtCreateHalfToneForGrid(context, grid, initialSize){

  // get grid points
  var gridPoints = grid.points,
      gridColor = grid.color;

  for (var i = 0; i < gridPoints.length; i++) {
    var aCircle = new context.Path.Circle(gridPoints[i], initialSize);
    aCircle.fillColor = new context.Color(gridColor[0]/255, gridColor[1]/255, gridColor[2]/255);
  }

}
*/
