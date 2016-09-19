// change the target color
function changeTargetColor(){
  targetCYMK = getRandomColor();
  updateTargetToCMYK(targetCYMK);
}

function checkColorMatch(){
  var deltaE = getCurrentDelta(),
      mensaje = "",
      texto = "",
      colorClass = "",
      resultContainer = document.getElementById('result__JS__container'),
      resultTitle = document.getElementById('result__JS__title'),
      resultText = document.getElementById('result__JS__text'),
      resultDelta = document.getElementById('result__JS__delta')
      ;

  if (deltaE < 0.3) {
    mensaje = "Perfecto";
    texto = "Sólo un colorímetro podría diferenciar estos dos colores, y su diferencia es despreciable";
    colorClass = "result--top";
  } else if (deltaE < 1) {
    mensaje = "Excelente";
    texto = "Los dos colores son casi identicos, solo un ojo entrenado aprecia su diferencia";
    colorClass = "result--top";
  } else if (deltaE < 3) {
    mensaje = "Bueno";
    texto = "Estos colores están muy cerca, si bien todavía la diferencia es visible a simple vista";
    colorClass = "result--high";
  } else if (deltaE < 5) {
    mensaje = "Correcto";
    texto = "Hay una diferencia apreciable, pero están cerca";
    colorClass = "result--mid";
  } else if (deltaE < 10) {
    mensaje = "Aceptable";
    texto = "Todavía hay una diferencia apreciable, pero están cerca";
    colorClass = "result--lowest";
  } else if (deltaE < 16) {
    mensaje = "Flojo";
    texto = "Estos colores se parecen, pero todavía están lejos.";
    colorClass = "result--lowest";
  } else {
    mensaje = "Muy flojo";
    texto = "Estos dos colores no se parecen en nada, volvé a intentarlo";
    colorClass = "result--bad";
  }

  resultContainer.className = "result " + colorClass;
  resultTitle.innerHTML = mensaje;
  resultText.innerHTML = texto;
  resultDelta.innerHTML = deltaE;

}

function startNewGame(){
  var resultContainer = document.getElementById('result__JS__container');

  targetCYMK = getRandomColor();
  updateTargetToCMYK(targetCYMK);

  resultContainer.className = "result result--noshow";
}
