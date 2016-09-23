var cyanSlider,
    yellowSlider,
    magentaSlider,
    blackSlider,
    targetCyan,
    targetMag,
    targetYel,
    targetBlack,
    editCyan,
    editMag,
    editYel,
    editBlack;

function createSquare(color, alpha, position){

  var point1 = new paper.Point(0,0),
      point2 = new paper.Point(250,250);

  if (position == "right") {
    point1 = new paper.Point(250,0),
    point2 = new paper.Point(500,250);
  }

  var square = new paper.Rectangle(point1, point2);

  var targetColor = new paper.Path.Rectangle(square)
  targetColor.fillColor = color;
  targetColor.blendMode = 'multiply';

  if (alpha) {
    targetColor.opacity = alpha/100;
  }

  return targetColor;

}

function setupView(){
  var baseRect = new paper.Rectangle(new paper.Point(0,0), new paper.Point(500,250));
  var base     = new paper.Path.Rectangle(baseRect);
  base.fillColor = '#ffffff';

  targetCyan  = createSquare(colCyan, targetCYMK.cyan),
  targetMag   = createSquare(colMag, targetCYMK.mag),
  targetYel   = createSquare(colYel, targetCYMK.yel),
  targetBlack = createSquare(colBlack, targetCYMK.black);

  editCyan  = createSquare(colCyan,   0.001, "right"),
  editMag   = createSquare(colMag,    0.001, "right"),
  editYel   = createSquare(colYel,    0.001, "right"),
  editBlack = createSquare(colBlack,  0.001, "right");
}

function updateTargetToCMYK(cmyk){
  targetCyan.opacity = (cmyk.cyan > 0) ? cmyk.cyan / 100 : 0.001,
  targetMag.opacity = (cmyk.mag > 0) ? cmyk.mag / 100 : 0.001,
  targetYel.opacity = (cmyk.yel > 0) ? cmyk.yel / 100 : 0.001,
  targetBlack.opacity = (cmyk.black > 0) ? cmyk.black / 100 : 0.001;
  paper.view.update();
}

function updateColor(color, value){
  var colorToAffect;

  switch (color) {
    case "cyan":
      colorToAffect = editCyan;
      break;
    case "magenta":
      colorToAffect = editMag;
      break;
    case "yellow":
      colorToAffect = editYel;
      break;
    case "black":
      colorToAffect = editBlack;
      break;
    default:
      colorToAffect = 0;
  }

  console.log(value);
  colorToAffect.opacity = value;

  paper.view.update();

}

function getCurrentColor(){
  var cyan = parseInt(cyanSlider.value) / 100,
      magenta = parseInt(magentaSlider.value) / 100,
      yellow = parseInt(yellowSlider.value) / 100,
      black = parseInt(blackSlider.value) / 100;
  return getRGBforCYMK ( cyan, magenta, yellow, black );
}

function getCurrentDelta(){
  var currentColor = getCurrentColor(),
      targetColor = getRGBforCYMKobject(targetCYMK);
  return getDeltaEforRGBPair(currentColor, targetColor);
}

function bindSliders(){
  cyanSlider    = document.getElementById("slider--cyan"),
  magentaSlider = document.getElementById("slider--magenta"),
  yellowSlider  = document.getElementById("slider--yellow"),
  blackSlider   = document.getElementById("slider--black");

  cyanSlider.addEventListener('input',function(){
    updateColor('cyan',   (cyanSlider.value/100))
  })

  magentaSlider.addEventListener('input',function(){
    updateColor('magenta',(magentaSlider.value/100))
  })

  yellowSlider.addEventListener('input',function(){
    updateColor('yellow', (yellowSlider.value/100))
  })

  blackSlider.addEventListener('input',function(){
    updateColor('black',  (blackSlider.value/100))
  })

  changeButton = document.getElementById('btnChange');
  confirmButton = document.getElementById('btnCheck');

  changeButton.addEventListener('click', changeTargetColor);
  confirmButton.addEventListener('click', checkColorMatch);

  newGameButton = document.getElementById('btnNewGame');
  newGameButton.addEventListener('click', fxGameBegin);

}
