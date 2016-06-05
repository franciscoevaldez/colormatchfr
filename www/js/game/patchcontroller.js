/*
  Possible difficulties:

  easiest
  -> one absolute dominant color (50+ 1 ink, 0 of the rest)
  -> two dominants (75+ 2 inks, 0 of rest)
  -> one dominant (50+ 1 ink, 25/50 other ink, 0 of rest)
  -> two dominants, a weak one (75+ 2 inks, 0->50 1 ink, 0 of rest)
  -> three in scale without black
  -> four even (desaturated tones: 0->30 all inks)
  hardest
*/

function getRandomInRange(minValue, maxValue){

  var range = maxValue - minValue;
  range = (range < 0) ? 0 : range;

  if(minValue === 0 && maxValue === 0){ minValue = 0.001 }

  var value = Math.floor(Math.random() * range) + minValue;
  if (value > 100) {value = 100}

  return value;
}

function randomizeAssignments (values, shouldIncludeBlack){
  var colorArray = [],
      iterations = shouldIncludeBlack ? 4 : 3;

  // loop for each of the combos…
  for (var i = 0; i < 4; i++) {
    // get a random combo index from the available combos
    var randomComboIndex = Math.floor(Math.random() * (iterations-i) );
    // assign it to the first color
    colorArray[i] = values[randomComboIndex];
    // remove the combo from the available array
    values.splice(randomComboIndex,1);
  }

  return colorArray;

}

// Absolute dominant: 1 high ink, none of the rest
function randomColorWithAbsoluteDominant(){
  var comboDominant = [70,100],
      comboNone     = [0,0],
      availCombos   = [comboDominant, comboNone, comboNone, comboNone],
      colorArray    = randomizeAssignments(availCombos, false);
  return setTargetCYMKFromArray(colorArray);
}

// Dominant: 1 high ink, one low-mid, none of the rest
function randomColorWithDominant(){
  var comboDominant = [70,100],
      comboWeak     = [50,75],
      comboNone     = [0,0],
      availCombos   = [comboDominant, comboWeak, comboNone, comboNone],
      colorArray    = randomizeAssignments(availCombos, false);
  return setTargetCYMKFromArray(colorArray);
}

// 2 dominants: 2 high inks, none of the other 2
function randomColorWithPair(){
  var comboDominant = [70,100],
      comboNone     = [0,0],
      availCombos   = [comboDominant, comboDominant, comboNone, comboNone],
      colorArray    = randomizeAssignments(availCombos, false);
  return setTargetCYMKFromArray(colorArray);
}

// 2 dominants and a weak, 2 mid to high, a low to mid, none of the 4th
function randomColorWithDominantPair(){
  var comboDominant = [70,100],
      comboWeak     = [25,60],
      comboNone     = [0,0],
      availCombos   = [comboDominant, comboDominant, comboWeak, comboNone],
      colorArray    = randomizeAssignments(availCombos, false);
  return setTargetCYMKFromArray(colorArray);
}

function randomColorWithScale(){
  var comboHigh     = [70,100],
      comboMid      = [40,80],
      comboLow      = [30,60],
      comboNil      = [0,0],
      availCombos   = [comboHigh, comboMid, comboLow, comboNil],
      colorArray    = randomizeAssignments(availCombos, false);
  return setTargetCYMKFromArray(colorArray);
}

function randomColorWithLightFour(){
  var comboRange    = [20,50],
      availCombos   = [comboRange, comboRange, comboRange, comboRange],
      colorArray    = randomizeAssignments(availCombos, false);
  return setTargetCYMKFromArray(colorArray);
}

function getRandomColor(){
  var randomColorsArray = [randomColorWithAbsoluteDominant(),
                          randomColorWithDominant(),
                          randomColorWithPair(),
                          randomColorWithScale(),
                          randomColorWithLightFour()]

  var callerIndex = Math.floor(Math.random() * 6 );

  return randomColorsArray[callerIndex];
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
