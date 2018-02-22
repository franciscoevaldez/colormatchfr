// Common file for both RGB & CMYK
/* This file should include:
- Game management
- Status management
- Color management
- UI elements
- Grading
*/

// Game Creation


// Color management -----------------------
var targetColor, targetLAB,
    playerColor, playerLAB,
    deltaE;


// Status Management -----------------------
var status          = 'playing',
    visualization   = 'stars';


// status changing and updates to the ui
function changeToState(newState, callback){
    
    // remove previous status
    ui.body.classList.remove('status--playing');
    ui.body.classList.remove('status--result');
    
    // apply new status
    var newStateClass;
    if (newState == 'playing'){
        newStateClass = 'status--playing';
    } else if (newState == 'result'){
        newStateClass = 'status--result';
    }
    ui.body.classList.add(newStateClass);
    
    // callback
    if(typeof callback === "function"){
        callback();
    }
    
}

// change state to playing (shortcut)
function changeStateToPlaying(){
    changeToState('playing', null);
}

// restart game
function doRestart(){
    getNewTargetColor();
    changeStateToPlaying();
}


// UI -----------------------

// declaration
var ui = {
    body        : document.body,
    workarea    : document.getElementById('workarea'),
    sliders     : {},
    button      : {
        new     : document.getElementById('btn__new'),
        compare : document.getElementById('btn__compare'),
        retry   : document.getElementById('btn__retry'),
        restart : document.getElementById('btn__restart')
    }
}

// setup result view
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

// result type 
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

// Grading -----------------------
function gradeDelta(newDelta){
    
    // create rate and message
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

