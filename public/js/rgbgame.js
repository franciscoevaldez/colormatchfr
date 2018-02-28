// Exclusive setup for RGB

// ui sliders and process color
ui.sliders = {
    r : document.getElementById("slider--red"),
    g : document.getElementById("slider--green"),
    b : document.getElementById("slider--blue")
};

ui.bars = document.getElementById('bars');
ui.barContainer = document.getElementById('barContainer');

ui.editArea.hide = function() {
    ui.bars.style.opacity = 0;
}

ui.editArea.show = function() {
    ui.bars.style.opacity = 1;
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
    ui.colorArea.style.background = 'rgb(' + newRandomRGB.red + ',' + newRandomRGB.green + ',' + newRandomRGB.blue + ')';

    return newRandomRGB;
}

ui.editArea.showResult = function(RGBcolor){
    ui.barContainer.style.background = 'rgb(' + RGBcolor.red + ',' + RGBcolor.green + ',' + RGBcolor.blue +')';
}

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
