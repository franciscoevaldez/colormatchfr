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
