// Grid handling functions

// fill optionals to default values
function grFillSettingsOptionals(settings){

  settings.width    = (settings.width)    ? settings.width    : 300;
  settings.height   = (settings.height)   ? settings.height   : 300;
  settings.distance = (settings.distance) ? settings.distance : 20;
  settings.rows     = (settings.rows)     ? settings.rows     : 20;
  settings.columns  = (settings.columns)  ? settings.columns  : 20;
  settings.offsetX  = (settings.offsetX)  ? settings.offsetX  : 0;
  settings.offsetY  = (settings.offsetY)  ? settings.offsetY  : 0;
  settings.angle    = (settings.angle)    ? settings.angle    : 0;
  settings.initial  = (settings.initial)  ? settings.initial  : 5;
  settings.color    = (settings.color)    ? settings.color    : [50,50,50];
  settings.maxSize  = (settings.maxSize)  ? settings.maxSize  : settings.distance * 1.45;

  return settings;
}

// Create a grid with settings
function grInitGridWithSettings(settings){
  var allSettings = grFillSettingsOptionals(settings),
      newGrid = {
        group       : 0,
        points      : [],
        dots        : [],
        dotSymbol   : [],
        distance    : settings.distance,
        maxSize     : settings.maxSize,
        color       : settings.color,
        angle       : settings.angle,
        initial     : settings.initial
      };

  newGrid.points      = grGetPointsForSettings(allSettings);
  newGrid.dotSymbol   = grGetDotSymbol(allSettings.color, allSettings.initial);
  newGrid.dots        = grGetDotsForGrid(newGrid);

  newGrid.group = new paper.Group(newGrid.dots);
  newGrid.group.blendMode = 'multiply';
  newGrid.group.rotate(newGrid.angle);

  return newGrid;

}

function grGetPointsForSettings(settings){

  var points      = [],
      extraPoints = 1,
      distance    = settings.distance,
      offsetX     = settings.offsetX  - (distance * (extraPoints * 3)),
      offsetY     = settings.offsetY  - (distance * (extraPoints * 3)),
      rows        = settings.rows     + (extraPoints * 2),
      cols        = settings.columns  + (extraPoints * 2);

  // Loop for rows...
  for (var rC = 0; rC < rows; rC++) {
    // ... and for columns
    for (var cC = 0; cC < cols; cC++) {

      var pointX    = offsetX + (distance * rC),        // X for the new point
          pointY    = offsetY + (distance * cC),        // Y for the new point
          newPoint  = new paper.Point(pointX, pointY);  // create the point

      points.push(newPoint);                            // add it to the array

    }

  }

  return points;

}

function grGetDotsForGrid(grid){
  var dots = [],
      points = grid.points,
      symbol = grid.dotSymbol;

  for (var i = 0; i < points.length; i++) {
    var aCircle = symbol.place(points[i]);
    dots.push(aCircle);
  }

  return dots;
}

function grGetDotSymbol(color, initialSize){
  var initialDot = new paper.Path.Circle(new paper.Point(0,0), initialSize);
  initialDot.fillColor = new paper.Color(color[0]/255, color[1]/255, color[2]/255);

  var symbol = new paper.Symbol(initialDot);
  return symbol;
}

function grSetValueForGrid(grid,size){
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

}
