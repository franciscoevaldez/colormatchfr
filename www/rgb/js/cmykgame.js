var targetRGB, userRGB,
    targetLAB, userLAB,
    deltaE;

var workarea = document.getElementById('workarea'),
    body = document.body;

var status = "playing";

var sliderC = document.getElementById("slider--cyan"),
    sliderM = document.getElementById("slider--yellow"),
    sliderY = document.getElementById("slider--magenta");
    sliderK = document.getElementById("slider--black");

function getNewTargetColor(){
  targetCMYK = color.setRandomCMYK()
  targetRGB = color.getRGBforCYMKobject(targetCMYK)
  targetLAB = color.getLABfromRGBobject(targetRGB);
  //$("#workarea").css('background-color', 'rgb(' + targetRGB.r + ',' + targetRGB.g + ',' + targetRGB.b + ')')
  workarea.style.backgroundColor = 'rgb(' + targetRGB.r + ',' + targetRGB.g + ',' + targetRGB.b + ')'
}

function changeToState(newState){

  //$('body').removeClass("status--playing")
  //$('body').removeClass("status--result")
  body.classList.remove('status--playing')
  body.classList.remove('status--result')

  if(newState == "playing"){
    //$('body').addClass("status--playing")
    body.classList.add('status--playing')
  }

  if(newState == "result"){
    //$('body').addClass("status--result");
    body.classList.add('status--result')
    setupResultFor(deltaE);
  }

}

function setupResultFor(newDelta){

  var resultContainer = document.getElementById('resultP');

  resultContainer.innerHTML = newDelta;

}

var btnNew = document.getElementById('btn__new');
btnNew.addEventListener('click',getNewTargetColor());
//$("#btn__new").click(getNewTargetColor)

var btnCompare = document.getElementById('btn__compare');
btnCompare.addEventListener('click', function(){
  userCMYK = {
    c : sliderC.value,
    m : sliderM.value,
    y : sliderY.value,
    k : sliderK.value
  };

  userRGB = color.getRGBforCYMKobject(userCMYK)
  userLAB = color.getLABfromRGBobject(userRGB);
  deltaE = getDeltaEforPair(targetLAB, userLAB);
  changeToState("result");
})

var btnRetry = document.getElementById('btn__retry');
btnRetry.addEventListener('click',changeToState("playing"));
/*
$("#btn__retry").click(function(){
  changeToState("playing");
})
*/

var btnRestart = document.getElementById('btn__restart');
btnRestart.addEventListener('click',function(){
  getNewTargetColor()
  changeToState("playing");
})

getNewTargetColor()

function getDeltaEforPair(labA, labB){

  // deltas
  var deltaL = labA[0] - labB[0];
  var deltaA = labA[1] - labB[1];
  var deltaB = labA[2] - labB[2];

  // eucledian delta
  var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  var deltaC = c1 - c2;
  var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  var sc = 1.0 + 0.045 * c1;
  var sh = 1.0 + 0.015 * c1;
  var deltaLKlsl = deltaL / (1.0);
  var deltaCkcsc = deltaC / (sc);
  var deltaHkhsh = deltaH / (sh);
  var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

// Get a LAB array from RGB values
function getLABfromRGB(red, green, blue){
  var r = red / 255,
      g = green / 255,
      b = blue / 255,
      x, y, z;

  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}
