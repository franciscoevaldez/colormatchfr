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

    //new randomic test
    var newColor = getAnyColor();

    game.color.target.current = newColor.rgb;
    game.color.target.lab = getLABfromRGBobject(newColor.rgb);
    game.color.target.difficulty = newColor.difficulty;
    ui.workarea.style.background = 'rgb(' + newColor.rgb.r + ',' + newColor.rgb.g + ',' + newColor.rgb.b + ')';

    return newColor.rgb;
}

ui.editArea.showResult = function(RGBcolor){
    ui.bars.style.background = 'rgb(' + RGBcolor.r + ',' + RGBcolor.g + ',' + RGBcolor.b +')';
}

// Compare the player and target color
// ** Should be refactored to compare any two colors
function compare(){

    // increase try count
    game.tryCount++

    // get values
    game.color.player.current = {
        r : parseInt(ui.sliders.r.value),
        g : parseInt(ui.sliders.g.value),
        b : parseInt(ui.sliders.b.value)
    };


    // log & ** analytics ** for tapped button
    var trackLabel = {
        "targetColor"   : game.color.target.current, 
        "testColor"     : game.color.player.current,
        "difficulty"    : game.color.target.difficulty
    }

    trackLabel = "";
    trackLabel += "LV," + game.color.target.difficulty;
    trackLabel += ",TC," + game.color.target.current.r + "," + game.color.target.current.g + "," + game.color.target.current.b;
    trackLabel += ",PC," + game.color.player.current.r + "," + game.color.player.current.g + "," + game.color.player.current.b;
    trackLabel += ",TR," + game.tryCount;

    fxTrackEvent("game", "evaluate", trackLabel);

    
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
        "testColor"     : game.color.player.current,
        "difficulty"    : game.color.target.difficulty
    }

    trackLabel = "";
    trackLabel += "LV," + game.color.target.difficulty;
    trackLabel += ",TC," + game.color.target.current.r + "," + game.color.target.current.g + "," + game.color.target.current.b;
    trackLabel += ",PC," + game.color.player.current.r + "," + game.color.player.current.g + "," + game.color.player.current.b;
    trackLabel += ",DE," + deltaE;
    trackLabel += ",TR," + game.tryCount;

    fxTrackEvent("game", "result", trackLabel);

    if (deltaE < 1.5) {
        var trackLabel = {
            "deltaE"        : deltaE, 
            "tryNumber"     : game.tryCount, 
            "targetColor"   : game.color.target.current, 
            "testColor"     : game.color.player.current,
            "difficulty"    : game.color.target.difficulty
        }
        
        trackLabel = "";
        trackLabel += "LV," + game.color.target.difficulty;
        trackLabel += ",TC," + game.color.target.current.r + "," + game.color.target.current.g + "," + game.color.target.current.b;
        trackLabel += ",PC," + game.color.player.current.r + "," + game.color.player.current.g + "," + game.color.player.current.b;
        trackLabel += ",DE," + deltaE;
        trackLabel += ",TR," + game.tryCount;


        fxTrackEvent("game", "result/under1.5", trackLabel);
    }

    

    // show results
    changeToState("result");
    setupResultFor(deltaE);
    ui.editArea.showResult(game.color.player.current)
}

ui.sliders.r.addEventListener("input", function(){
    game.hasInteracted = true;
    $('.bar--red').css('opacity', this.value/255);
})

ui.sliders.g.addEventListener("input", function(){
    game.hasInteracted = true;
    $('.bar--green').css('opacity', this.value/255);
})

ui.sliders.b.addEventListener("input", function(){
    game.hasInteracted = true;
    $('.bar--blue').css('opacity', this.value/255);
})




ui.button.compare.addEventListener("click", compare);

game.color.target.new();
