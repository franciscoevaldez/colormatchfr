// Exclusive setup for RGB

// ui sliders and process color
ui.sliders = {
    r : document.getElementById("slider--red"),
    g : document.getElementById("slider--green"),
    b : document.getElementById("slider--blue")
};
ui.bars = document.getElementById('bars');

// getting a new color and displaying it
function getNewTargetColor(){
    targetColor = getRandomColor()
    targetLAB = getLABfromRGBobject(targetColor);
    ui.workarea.style.backgroundColor = 'rgb(' + targetColor.red + ',' + targetColor.green + ',' + targetColor.blue + ')';
}

// show a new color
function showColor(){
    var nuColor = 'rgb(' + ui.sliders.r.value + ',' + ui.sliders.g.value + ',' + ui.sliders.b.value +')';
    ui.bars.style.background = nuColor;
    $('.bar').css('visibility','hidden');
}

// Compare the player and target color
// ** Should be refactored to compare any two colors
function compare(){
    playerColor = {
        red : ui.sliders.r.value,
        green : ui.sliders.g.value,
        blue : ui.sliders.b.value
    };
    
    playerLAB = getLABfromRGBobject(playerColor);
    deltaE = getDeltaEforPair(targetLAB, playerLAB);
    deltaE = Math.round(deltaE*1000)/1000;

    changeToState("result", function(){
        $('.bar').css('visibility','visible');
        ui.bars.style.background = 'black';
        setupResultFor(deltaE);
    });

    showColor();
}

// RGB Sliders
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

ui.button.retry.addEventListener("click", function(){
    changeToState('playing', function(){
        $('.bar').css('visibility','visible');
        ui.bars.style.background = 'black';
    });
});

ui.button.restart.addEventListener('click',function(){
    $('.bar').css('visibility','visible');
    doRestart();
});

getNewTargetColor()
