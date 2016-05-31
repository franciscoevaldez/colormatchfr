function getRandomInRange(range, position){

  var maxValue = 100,
      minValue = 0;

  if (range == "max") { maxValue = 100};
  if (range == "mid") { maxValue = 50};
  if (range == "low") { maxValue = 25};
  if (range == "min") { maxValue = 10};
  if (range == "nil") { maxValue = 0};

  if (position == "max") {minValue = 90}
  if (position == "high") {minValue = 70}
  if (position == "mid") {minValue = 45}
  if (position == "low") {minValue = 20}
  if (position == "nil") {minValue = 0}

  if(range == "nil" && position === "nil"){ minValue = 0.001 }

  value = Math.floor(Math.random() * maxValue) + minValue;
  if (value > 100) {value = 100}

  return value;
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
