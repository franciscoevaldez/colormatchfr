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

// Compare the player and target color
// ** Should be refactored to compare any two colors
function compare(){

    // get values
    game.color.player = {
        red : ui.sliders.r.value,
        green : ui.sliders.g.value,
        blue : ui.sliders.b.value
    };
    
    // calculate delta
    playerLAB = getLABfromRGBobject(game.color.player);
    deltaE = getDeltaEforPair(game.color.target.lab, playerLAB);
    deltaE = Math.round(deltaE*100)/100;

    // log & analytics
    var trackLabel = {
        "deltaE"        : deltaE, 
        "tryNumber"     : game.tryNumber, 
        "targetColor"   : game.color.target.current, 
        "testColor"     : game.color.player
    }
    var trackTag = {
        "category"  : "result",
        "action"    : "result/other",
        "label"     : trackLabel
    }
    console.log(trackTag)

    // show results
    changeToState("result");
    setupResultFor(deltaE);
    ui.editArea.showResult(game.color.player)
}

// RGB Sliders
/*
$("#slider--red").change(function() {
    $('.bar--red').css('opacity', this.value/255);
});
$("#slider--green").change(function() {
    $('.bar--green').css('opacity', this.value/255);
});
$("#slider--blue").change(function() {
    $('.bar--blue').css('opacity', this.value/255);
});
*/

ui.sliders.r.addEventListener("input", function(){
    $('.bar--red').css('opacity', this.value/255);
})

ui.sliders.g.addEventListener("input", function(){
    $('.bar--green').css('opacity', this.value/255);
})

ui.sliders.b.addEventListener("input", function(){
    $('.bar--blue').css('opacity', this.value/255);
})




ui.button.compare.addEventListener("click", compare);

game.color.target.new();
