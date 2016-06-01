// change the target color
function changeTargetColor(){
  targetCYMK = randomColorWithScale();
  updateTargetToCMYK(targetCYMK);
}

function checkColorMatch(){
  var deltaE = getCurrentDelta(),
      mensaje = "",
      colorClass = "",
      resultContainer = document.getElementById('result__JS__container'),
      resultTitle = document.getElementById('result__JS__title'),
      resultDelta = document.getElementById('result__JS__delta')
      ;

  if (deltaE < 2) {
    mensaje = "Excelente!";
    colorClass = "result--top";
  } else if (deltaE < 4) {
    mensaje = "Muy Bueno";
    colorClass = "result--high";
  } else if (deltaE < 6) {
    mensaje = "Bueno";
    colorClass = "result--mid";
  } else if (deltaE < 9) {
    mensaje = "Correcto";
    colorClass = "result--low";
  } else if (deltaE < 12) {
    mensaje = "Aceptable";
    colorClass = "result--lowest";
  } else {
    mensaje = "Flojo";
    colorClass = "result--bad";
  }

  resultContainer.className = "result " + colorClass;
  resultTitle.innerHTML = mensaje;
  resultDelta.innerHTML = deltaE;

}

function startNewGame(){
  var resultContainer = document.getElementById('result__JS__container');
  
  targetCYMK = randomColorWithScale();
  updateTargetToCMYK(targetCYMK);

  resultContainer.className = "result result--noshow";
}
