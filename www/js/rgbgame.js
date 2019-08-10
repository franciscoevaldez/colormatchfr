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

    // increase try count
    game.tryCount++

    // get values
    game.color.player.current = {
        red : parseInt(ui.sliders.r.value),
        green : parseInt(ui.sliders.g.value),
        blue : parseInt(ui.sliders.b.value)
    };


    // log & ** analytics ** for tapped button
    var trackLabel = {
        "targetColor"   : game.color.target.current, 
        "testColor"     : game.color.player.current
    }
    var trackTag = {
        "category"  : "game",
        "action"    : "evaluate",
        "label"     : trackLabel
    }
    console.log(trackTag);

    
    // calculate delta
    playerLAB = getLABfromRGBobject(game.color.player.current);
    deltaE = getDeltaEforPair(game.color.target.lab, playerLAB);
    deltaE = Math.round(deltaE*100)/100;
    game.deltaE = deltaE;

    // log & **analytics**
    var trackLabel = {
        "deltaE"        : deltaE, 
        "tryNumber"     : game.tryCount, 
        "targetColor"   : game.color.target.current, 
        "testColor"     : game.color.player.current
    }
    var trackTag = {
        "category"  : "results",
        "action"    : "result",
        "label"     : trackLabel
    }
    console.log(trackTag);

    // show results
    changeToState("result");
    setupResultFor(deltaE);
    ui.editArea.showResult(game.color.player.current)
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
