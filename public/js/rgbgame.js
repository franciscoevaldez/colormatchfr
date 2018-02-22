// Exclusive setup for RGB

// ui sliders and process color
ui.sliders = {
    r : document.getElementById("slider--red"),
    g : document.getElementById("slider--green"),
    b : document.getElementById("slider--blue")
};

ui.bars = document.getElementById('bars');

ui.editArea.hide = function() {
    $('.bar').css('visibility','hidden');
}

ui.editArea.show = function() {
    $('.bar').css('visibility','visible');
    ui.bars.style.background = 'black';
}

// function for getting a new color
game.color.target.new = function(){
    var newRed = Math.round(Math.random() * 255),
        newGreen = Math.round(Math.random() * 255),
        newBlue = Math.round(Math.random() * 255);

    var newRandomRGB = {
        red : newRed,
        green : newGreen,
        blue : newBlue
    };

    game.color.target.current = newRandomRGB;
    game.color.target.lab = getLABfromRGBobject(newRandomRGB);
    ui.workarea.style.background = 'rgb(' + newRandomRGB.red + ',' + newRandomRGB.green + ',' + newRandomRGB.blue + ')';

    return newRandomRGB;
}

ui.editArea.showResult = function(RGBcolor){
    ui.bars.style.background = 'rgb(' + RGBcolor.red + ',' + RGBcolor.green + ',' + RGBcolor.blue +')';
}

// getting a new color and displaying it
// function getNewTargetColor(){
//     targetColor = getRandomColor()
//     targetLAB = getLABfromRGBobject(targetColor);
//     ui.workarea.style.backgroundColor = 'rgb(' + targetColor.red + ',' + targetColor.green + ',' + targetColor.blue + ')';
// }

// show formed color
// function showResultingColor(color){
//     ui.bars.style.background = 'rgb(' + color.red + ',' + color.green + ',' + color.blue +')';
// }

// Compare the player and target color
// ** Should be refactored to compare any two colors
function compare(){
    game.color.player = {
        red : ui.sliders.r.value,
        green : ui.sliders.g.value,
        blue : ui.sliders.b.value
    };
    
    playerLAB = getLABfromRGBobject(game.color.player);
    deltaE = getDeltaEforPair(game.color.target.lab, playerLAB);
    deltaE = Math.round(deltaE*100)/100;

    changeToState("result");
    setupResultFor(deltaE);
    ui.editArea.showResult(game.color.player)
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

ui.button.compare.addEventListener("click", compare);

//getNewTargetColor()
game.color.target.new();
