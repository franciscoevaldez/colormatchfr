/*
  Possible difficulties:

  easiest
  -> one absolute dominant color (50+ 1 ink, 0 of the rest)
  -> two dominants (75+ 2 inks, 0 of rest)
  -> one dominant (50+ 1 ink, 25/50 other ink, 0 of rest)
  -> two dominants, a weak one (75+ 2 inks, 0->50 1 ink, 0 of rest)
  -> four even (desaturated tones: 0->30 all inks)
  hardest
*/


function getRandomInRange(range, position){

  var maxValue = 100,
      minValue = 0;

  if (range == "max") { maxValue = 100};
  if (range == "high") { maxValue = 75};
  if (range == "mid") { maxValue = 50};
  if (range == "low") { maxValue = 25};
  if (range == "min") { maxValue = 10};
  if (range == "nil") { maxValue = 0};

  if (position == "max") {minValue = 95}
  if (position == "high") {minValue = 75}
  if (position == "mid") {minValue = 50}
  if (position == "low") {minValue = 25}
  if (position == "min") {minValue = 10}
  if (position == "nil") {minValue = 0}

  topValue = maxValue - minValue;
  topValue = (topValue < 0) ? 0 : topValue;

  if(range == "nil" && position === "nil"){ minValue = 0.001 }

  value = Math.floor(Math.random() * topValue) + minValue;
  if (value > 100) {value = 100}

  return value;
}

// Absolute dominant: 1 high ink, none of the rest
function randomColorWithAbsoluteDominant(){

  // pick a random color to be the dominant
  var dominantOne = Math.floor(Math.random() * 3),
      domCombos = [
        [["max", "mid"], ["nil", "nil"], ["nil", "nil"], ["nil", "nil"]], // Cyan
        [["nil", "nil"], ["max", "mid"], ["nil", "nil"], ["nil", "nil"]], // Magenta
        [["nil", "nil"], ["nil", "nil"], ["max", "mid"], ["nil", "nil"]]  // Yellow
      ];

  return setTargetCYMKFromArray(domCombos[dominantOne]);

}

// Dominant: 1 high ink, one low-mid, none of the rest
function randomColorWithDominant(){

  // Available combos:
  var comboDominant = ["max", "high"],
      comboWeak     = ["high", "mid"],
      comboNone     = ["nil", "nil"],
      availCombos   = [comboDominant, comboWeak, comboNone, comboNone]
      colorArray    = [];

  // loop for each of the combos…
  for (var i = 0; i < 4; i++) {

    // get a random combo index from the available combos
    var randomComboIndex = Math.floor(Math.random() * (4-i) );
    // assign it to the first color
    colorArray[i] = availCombos[randomComboIndex];
    // remove the combo from the available array
    availCombos.splice(randomComboIndex,1);

  }

  return setTargetCYMKFromArray(colorArray);

}

// 2 dominants: 2 high inks, none of the other 2
function randomColorWithDominant(){

  // Available combos:
  var comboDominant = ["max", "mid"],
      comboWeak     = ["low", "low"],
      comboNone     = ["nil", "nil"],
      availCombos   = [comboDominant, comboWeak, comboNone, comboNone]
      colorArray    = [];

  // loop for each of the combos…
  for (var i = 0; i < 4; i++) {

    // get a random combo index from the available combos
    var randomComboIndex = Math.floor(Math.random() * (4-i) );
    // assign it to the first color
    colorArray[i] = availCombos[randomComboIndex];
    // remove the combo from the available array
    availCombos.splice(randomComboIndex,1);

  }

  return setTargetCYMKFromArray(colorArray);

}


function setTargetCYMKFromArray(params){
  var rangeCyan   = params[0],
      rangeMag    = params[1],
      rangeYel    = params[2],
      rangeBlack  = params[3];

  var randCyan  = getRandomInRange(rangeCyan[0], rangeCyan[1]),
      randMag   = getRandomInRange(rangeMag[0], rangeMag[1]),
      randYel   = getRandomInRange(rangeYel[0], rangeYel[1]),
      randBlack = getRandomInRange(rangeBlack[0], rangeBlack[1]),
      colDict   = {
        "cyan"  : randCyan,
        "mag"   : randMag,
        "yel"   : randYel,
        "black" : randBlack
      };

  console.log(colDict)

  return colDict;
}

function setTargetCYMK(){
  var randCyan  = getRandomInRange("nil", "nil"),
      randMag   = getRandomInRange("max", "nil"),
      randYel   = getRandomInRange("max", "nil"),
      randBlack = getRandomInRange("nil", "nil"),
      colDict   = {
        "cyan"  : randCyan,
        "mag"   : randMag,
        "yel"   : randYel,
        "black" : randBlack
      };

  console.log(colDict)

  return colDict;
}
