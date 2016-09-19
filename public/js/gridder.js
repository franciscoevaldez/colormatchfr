// fourGrid creation
function grFourGrid(overrides){

  var cyanPresets     = overrides,
      magentaPresets  = overrides,
      yellowPresets   = overrides,
      blackPresets    = overrides;

  cyanPresets.color    = [0,163,218];
  cyanPresets.angle    = -15;
  this.cyan            = new grGrid ( cyanPresets );

  magentaPresets.color = [216,18,125];
  magentaPresets.angle = -75;
  this.magenta         = new grGrid ( magentaPresets );

  yellowPresets.color  = [255,240,3];
  yellowPresets.angle  = 0;
  this.yellow          = new grGrid ( yellowPresets );

  blackPresets.color   = [10,10,10];
  blackPresets.angle   = -45;
  this.black           = new grGrid ( blackPresets );

}



// Grid creation, taking settings from dictionary
function grGrid(settings){
  // Container settings
  this.width        = (settings.width)        ? settings.width        : 300;
  this.height       = (settings.height)       ? settings.height       : 300;
  // Grid settings
  this.distance     = (settings.distance)     ? settings.distance     : 20;
  this.rows         = (settings.rowsAndCols)  ? settings.rowsAndCols  : 20;
  this.columns      = this.rows;
  this.angle        = (settings.angle)        ? settings.angle        : 0;
  this.color        = (settings.color)        ? settings.color        : [50,50,50];
  // Dot settings
  this.offsetX      = (settings.offsetX)      ? settings.offsetX      : 0;
  this.offsetY      = (settings.offsetY)      ? settings.offsetY      : 0;
  this.maxSize      = (settings.maxSize)      ? settings.maxSize      : this.distance * 1.45;
  this.value        = (settings.value)        ? settings.value        : this.maxSize/2;


  // ------------ Setting up the view --------------------

  // 1. Create the point symbol
  var initialPoint        = new paper.Path.Circle(new paper.Point(0,0), this.value);
  initialPoint.fillColor  = new paper.Color(this.color[0]/255, this.color[1]/255, this.color[2]/255);
  this.pointSymbol        = new paper.Symbol(initialPoint);

  // 2. Get coordinates & create points
  this.points     = [];
  var extraPoints = 1,
      _gridX      = this.offsetX - (this.distance * (extraPoints * 3)),
      _gridY      = this.offsetY - (this.distance * (extraPoints * 3));
  // Loop for rows...
  for (var rC = 0; rC < (this.rows + (extraPoints * 2)); rC++) {
    // ... and for columns
    for (var cC = 0; cC < (this.columns + (extraPoints * 2)); cC++) {

      var pointX = _gridX + (this.distance * rC),         // X for the new point
          pointY = _gridY + (this.distance * cC),         // Y for the new point
          //coords = new paper.Point(pointX, pointY),       // create the point
          aPoint = this.pointSymbol.place( new paper.Point(pointX, pointY) );

      this.points.push(aPoint);

    }

  }

  // Group settings
  this.group = new paper.Group(this.points);
  this.group.blendMode = 'multiply';
  this.group.rotate(this.angle);


  // methods
  this.updateValue = function ( value ) {
    var currentSize = this.pointSymbol.definition.bounds.width,
        targetSize  = value * this.maxSize,
        delta       = targetSize / currentSize;

    if (value == 0) {
      this.pointSymbol.definition.opacity = 0;
    } else {
      if (this.pointSymbol.definition.opacity == 0) {
        this.pointSymbol.definition.opacity = 1;
      }
      this.pointSymbol.definition.scale(delta);
    }
    paper.view.update();
  }

  return this;

}
