var gridCyan, gridMagenta, gridYellow, gridBlack;

window.onload = function() {

  // declare the grid canvas
  var canvasHalftones = document.getElementById('grid--halftones');

  // create the paper object
  paper.setup(canvasHalftones);

  // create the grids
  gridCyan = mtCreateGridWithSettings({
      distance  : 20,
      color     : [0,163,218],
      angle     : -15,
      initial   : 9
    });

  gridMagenta = mtCreateGridWithSettings({
      distance  : 20,
      color     : [216,18,125],
      angle     : -75,
      initial   : 7
    });

  gridYellow = mtCreateGridWithSettings({
      distance  : 20,
      color     : [255,240,3],
      angle     : 0,
      initial   : 9
    });

  gridBlack = mtCreateGridWithSettings({
      distance  : 20,
      color     : [0,0,0],
      angle     : -45,
      initial   : 1
    });

  mtDisplayGrid(gridCyan)
  mtDisplayGrid(gridMagenta)
  mtDisplayGrid(gridBlack)
  mtDisplayGrid(gridYellow)

  // Update canvas
  paper.view.update();


  // BUNDLE SLIDER EVENTS
  var cyanSlider    = document.getElementById("slider--cyan"),
      yellowSlider  = document.getElementById("slider--yellow"),
      magentaSlider = document.getElementById("slider--magenta"),
      blackSlider   = document.getElementById("slider--black");

  cyanSlider.addEventListener('input',function(){
    mtResizeGrid(gridCyan,(cyanSlider.value/100))
  })

  yellowSlider.addEventListener('input',function(){
    mtResizeGrid(gridYellow,(yellowSlider.value/100))
  })

  magentaSlider.addEventListener('input',function(){
    mtResizeGrid(gridMagenta,(magentaSlider.value/100))
  })

  blackSlider.addEventListener('input',function(){
    mtResizeGrid(gridBlack,(blackSlider.value/100))
  })

}
