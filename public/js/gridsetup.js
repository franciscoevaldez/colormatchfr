var gridCyan, gridMagenta, gridYellow, gridBlack;

window.onload = function() {

  // declare the grid canvas
  var canvasHalftones = document.getElementById('grid--halftones');

  // create the paper object
  paper.setup(canvasHalftones);

  // create the grids
  gridCyan = grInitGridWithSettings({
      color     : [0,163,218],
      angle     : -15
    });

  gridMagenta = grInitGridWithSettings({
      color     : [216,18,125],
      angle     : -75
    });

  gridYellow = grInitGridWithSettings({
      color     : [255,240,3],
      angle     : 0
    });

  gridBlack = grInitGridWithSettings({
      color     : [10,10,10],
      angle     : -45
    });

  // Update canvas
  paper.view.update();


  // BUNDLE SLIDER EVENTS
  var cyanSlider    = document.getElementById("slider--cyan"),
      yellowSlider  = document.getElementById("slider--yellow"),
      magentaSlider = document.getElementById("slider--magenta"),
      blackSlider   = document.getElementById("slider--black");

  cyanSlider.addEventListener('input',function(){
    grSetValueForGrid(gridCyan,(cyanSlider.value/100))
  })

  yellowSlider.addEventListener('input',function(){
    grSetValueForGrid(gridYellow,(yellowSlider.value/100))
  })

  magentaSlider.addEventListener('input',function(){
    grSetValueForGrid(gridMagenta,(magentaSlider.value/100))
  })

  blackSlider.addEventListener('input',function(){
    grSetValueForGrid(gridBlack,(blackSlider.value/100))
  })

}
