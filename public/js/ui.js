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

// Switch among result types
$(".result").dblclick(function(){
    toggleResultType()
});