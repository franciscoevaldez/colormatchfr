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

  editCyan  = createSquare(colCyan,   0, "right"),
  editMag   = createSquare(colMag,    0, "right"),
  editYel   = createSquare(colYel,    0, "right"),
  editBlack = createSquare(colBlack,  0, "right");
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

function bindSliders(){
  cyanSlider    = document.getElementById("slider--cyan"),
  yellowSlider  = document.getElementById("slider--yellow"),
  magentaSlider = document.getElementById("slider--magenta"),
  blackSlider   = document.getElementById("slider--black");

  cyanSlider.addEventListener('input',function(){
    updateColor('cyan',   (cyanSlider.value/100))
  })

  yellowSlider.addEventListener('input',function(){
    updateColor('yellow', (yellowSlider.value/100))
  })

  magentaSlider.addEventListener('input',function(){
    updateColor('magenta',(magentaSlider.value/100))
  })

  blackSlider.addEventListener('input',function(){
    updateColor('black',  (blackSlider.value/100))
  })
}
