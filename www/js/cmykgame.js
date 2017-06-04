var targetRGB, userRGB,
    targetLAB, userLAB,
    deltaE;

var status = "playing";

var sliderC = document.getElementById("slider--cyan"),
    sliderM = document.getElementById("slider--yellow"),
    sliderY = document.getElementById("slider--magenta");
    sliderK = document.getElementById("slider--black");

function getNewTargetColor(){
  targetCMYK = color.setRandomCMYK()
  targetRGB = color.getRGBforCYMKobject(targetCMYK)
  targetLAB = color.getLABfromRGBobject(targetRGB);
  $("#workarea").css('background-color', 'rgb(' + targetRGB.r + ',' + targetRGB.g + ',' + targetRGB.b + ')')
}

function changeToState(newState){

  $('body').removeClass("status--playing")
  $('body').removeClass("status--result")

  if(newState == "playing"){
    $('body').addClass("status--playing")
  }

  if(newState == "result"){
    $('body').addClass("status--result");
    setupResultFor(deltaE);
  }

}

function setupResultFor(newDelta){

  var resultContainer = document.getElementById('resultP');

  resultContainer.innerHTML = newDelta;

}

$("#btn__new").click(getNewTargetColor)

$("#btn__compare").click(function(){

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

$("#btn__retry").click(function(){
  changeToState("playing");
})

$("#btn__restart").click(function(){
  getNewTargetColor()
  changeToState("playing");
})

getNewTargetColor()
