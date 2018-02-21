var targetRGB, userRGB,
    targetLAB, userLAB,
    deltaE;

var ui = {
    body        : document.body,
    workarea    : document.getElementById('workarea'),
    sliders     : {
        r : document.getElementById("slider--red"),
        g : document.getElementById("slider--green"),
        b : document.getElementById("slider--blue")
    },
    button      : {
        new     : document.getElementById('btn__new'),
        compare : document.getElementById('btn__compare'),
        retry   : document.getElementById('btn__retry'),
        restart : document.getElementById('btn__restart')
    },
    bars        : document.getElementById('bars')
};

var status = "playing",
    visualization = 'stars';

function getNewTargetColor(){
    targetRGB = getRandomColor()
    targetLAB = getLABfromRGBobject(targetRGB);
    ui.workarea.style.backgroundColor = 'rgb(' + targetRGB.red + ',' + targetRGB.green + ',' + targetRGB.blue + ')';
}

function changeToState(newState){

    ui.body.classList.remove('status--playing')
    ui.body.classList.remove('status--result')

    if(newState == "playing"){
        ui.body.classList.add('status--playing')
        $('.bar').css('visibility','visible');
        ui.bars.style.background = 'black';
    }

    if(newState == "result"){
        ui.body.classList.add('status--result');
        setupResultFor(deltaE);
    }

}

function changeToPlaying(){
    changeToState('playing');
}

function gradeDelta(newDelta){

var newClass, newMessage;

if (newDelta < 1) {
newClass="rating--9";
newMessage="Excelente";
} else if (newDelta < 2.2) {
newClass="rating--8";
newMessage="Excelente";
} else if (newDelta < 5) {
newClass="rating--7";
newMessage="Muy bueno";
} else if (newDelta < 8) {
newClass="rating--6";
newMessage="Muy bueno";
} else if (newDelta < 12) {
newClass="rating--5";
newMessage="Aceptable";
} else if (newDelta < 18) {
newClass="rating--4";
newMessage="Aceptable";
} else if (newDelta < 25) {
newClass="rating--3";
newMessage="Pobre";
} else if (newDelta < 35) {
newClass="rating--2";
newMessage="Pobre";
} else if (newDelta < 50) {
newClass="rating--1";
newMessage="Malo";
} else {
newClass="rating--0";
newMessage="Malo";
}

return [newClass, newMessage];

}

function setupResultFor(newDelta){

var resultContainer = document.getElementById('resultP');
var resultText = document.getElementById('resultText');
var messages = gradeDelta(newDelta);

ui.body.classList.remove('rating--0');
ui.body.classList.remove('rating--1');
ui.body.classList.remove('rating--2');
ui.body.classList.remove('rating--3');
ui.body.classList.remove('rating--4');
ui.body.classList.remove('rating--5');
ui.body.classList.remove('rating--6');
ui.body.classList.remove('rating--7');
ui.body.classList.remove('rating--8');
ui.body.classList.remove('rating--9');

ui.body.classList.add(messages[0]);

resultText.innerHTML = messages[1];
resultContainer.innerHTML = newDelta;

}

function toggleResultType(){
if (visualization == 'stars') {
ui.body.classList.remove('result--stars');
ui.body.classList.add('result--number');
visualization = 'number';
} else {
ui.body.classList.remove('result--number');
ui.body.classList.add('result--stars');
visualization = 'stars'
}
}

function showColor(){
var nuColor = 'rgb(' + ui.sliders.r.value + ',' + ui.sliders.g.value + ',' + ui.sliders.b.value +')';
ui.bars.style.background = nuColor;
$('.bar').css('visibility','hidden');
}

function compare(){
userRGB = {
red : ui.sliders.r.value,
green : ui.sliders.g.value,
blue : ui.sliders.b.value
};

userLAB = getLABfromRGBobject(userRGB);
deltaE = getDeltaEforPair(targetLAB, userLAB);
deltaE = Math.round(deltaE*1000)/1000;
changeToState("result");
showColor();
}

function doRestart(){
getNewTargetColor()
changeToPlaying();
}

$("#slider--red").change(function() {
var newValue = this.value;
$('.bar--red').css('opacity', newValue/255);
});
$("#slider--green").change(function() {
var newValue = this.value;
$('.bar--green').css('opacity', newValue/255);
});
$("#slider--blue").change(function() {
var newValue = this.value;
$('.bar--blue').css('opacity', newValue/255);
});

ui.button.new.addEventListener("click",getNewTargetColor);
ui.button.compare.addEventListener("click",compare);
ui.button.retry.addEventListener("click",changeToPlaying);
ui.button.restart.addEventListener('click',doRestart);

$(".result").dblclick(function(){
toggleResultType()
});

getNewTargetColor()
