var gridCyan, gridMagenta, gridYellow, gridBlack;

window.onload = function() {

  // declare the grid canvas
  var canvasHalftones = document.getElementById('grid--halftones');

  // create the paper object
  paper.setup(canvasHalftones);

  var halftones = new grFourGrid({});
  gridCyan    = halftones.cyan;
  gridMagenta = halftones.magenta;
  gridYellow  = halftones.yellow;
  gridBlack   = halftones.black;

  // Update canvas
  paper.view.update();


  // BUNDLE SLIDER EVENTS
  var cyanSlider    = document.getElementById("slider--cyan"),
      yellowSlider  = document.getElementById("slider--yellow"),
      magentaSlider = document.getElementById("slider--magenta"),
      blackSlider   = document.getElementById("slider--black");

  cyanSlider.addEventListener('input',function(){
    gridCyan.updateValue(cyanSlider.value/100)
  })

  yellowSlider.addEventListener('input',function(){
    gridYellow.updateValue(yellowSlider.value/100)
  })

  magentaSlider.addEventListener('input',function(){
    gridMagenta.updateValue(magentaSlider.value/100)
  })

  blackSlider.addEventListener('input',function(){
    gridBlack.updateValue(blackSlider.value/100)
  })

}
