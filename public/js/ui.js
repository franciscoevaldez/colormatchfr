// UI -----------------------
// - UI elements

// declarations
var ui = {
    body        : document.body,
    colorArea    : document.getElementById('colorArea'),
    sliders     : {},
    button      : {
        new     : document.getElementById('btn__new'),
        compare : document.getElementById('btn__compare'),
        retry   : document.getElementById('btn__retry'),
        restart : document.getElementById('btn__restart')
    },
    editArea    : {
        hide    : function(){},
        show    : function(){},
        showResult : function(){}
    },
    result      : {
        container:  document.getElementById('resultP'),
        text:       document.getElementById('resultText')
    },
    onboarding  : {
        container   : document.getElementById('onboarding'),
        steps       : ['ob--step1', 'ob--step2'],
        hide        : hideOnboarding,
        show        : showOnboarding
    }
}

// setup result view
function setupResultFor(newDelta){

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
    
    ui.result.text.innerHTML = messages[1];
    ui.result.container.innerHTML = newDelta;
    
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

// hide onboarding
function hideOnboarding(){
    for (let stepI = 0; stepI < ui.onboarding.steps.length; stepI++) {
        ui.body.classList.remove(ui.onboarding.steps[stepI]);
    }
}

function showOnboarding(step){
    var newStep = (step) ? step-1 : 0;
    ui.body.classList.add(ui.onboarding.steps[newStep]);
}


ui.button.new.addEventListener("click", game.restart);
ui.button.retry.addEventListener("click", game.status.setToPlaying);
ui.button.restart.addEventListener('click', game.restart);
ui.onboarding.container.addEventListener('click',hideOnboarding);