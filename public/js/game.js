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

