var cyanColor     = { "red" : 0,    "green": 163,   "blue": 218 },
    magentaColor  = { "red" : 216,  "green": 18,    "blue": 125 },
    yellowColor   = { "red" : 255,  "green": 240,   "blue": 3   },
    blackColor    = { "red" : 10,   "green": 10,    "blue": 10  };

function getRGBforColorAtOpacity(color, opacity){

  var color = {
    "red" : color.red + (255 - color.red) * (1 - opacity),
    "green" : color.green + (255 - color.green) * (1 - opacity),
    "blue" : color.blue + (255 - color.blue) * (1 - opacity)
  }

  return color;
}

function multiplyRGBColors(cyan, magenta, yellow, black){
  var red   = ((cyan.red   * magenta.red    / 255) * yellow.red    / 255) * black.red   / 255,
      green = ((cyan.green * magenta.green  / 255) * yellow.green  / 255) * black.green / 255,
      blue  = ((cyan.blue  * magenta.blue   / 255) * yellow.blue   / 255) * black.blue  / 255;

  return {"red" : red, "green" : green, "blue" : blue};
}

function getDeltaEforPair(labA, labB){
  var deltaL = labA[0] - labB[0];
  var deltaA = labA[1] - labB[1];
  var deltaB = labA[2] - labB[2];
  var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
  var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
  var deltaC = c1 - c2;
  var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
  deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
  var sc = 1.0 + 0.045 * c1;
  var sh = 1.0 + 0.015 * c1;
  var deltaLKlsl = deltaL / (1.0);
  var deltaCkcsc = deltaC / (sc);
  var deltaHkhsh = deltaH / (sh);
  var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
  return i < 0 ? 0 : Math.sqrt(i);
}

function getLABfromRGB(red, green, blue){
  var r = red / 255,
      g = green / 255,
      b = blue / 255,
      x, y, z;

  r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
  g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
  b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

  x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
  z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

  x = (x > 0.008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
  y = (y > 0.008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
  z = (z > 0.008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

  return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
}

function getLABfromRGBobject(rgb) {
  return getLABfromRGB(rgb.red, rgb.green, rgb.blue);
}

function getDeltaEforRGBPair(firstColor, secondColor){
  var firstLAB = getLABfromRGBobject(firstColor),
      secondLAB = getLABfromRGBobject(secondColor);
  return getDeltaEforPair(firstLAB, secondLAB);
}


// get the rgb value from the cymk
function getRGBforCYMK(_cyan, _magenta, _yellow, _black){
  var cyan  = getRGBforColorAtOpacity(cyanColor, _cyan),
      mag   = getRGBforColorAtOpacity(magentaColor, _magenta),
      yel   = getRGBforColorAtOpacity(yellowColor, _yellow),
      black = getRGBforColorAtOpacity(blackColor, _black);

  return multiplyRGBColors(cyan, mag, yel, black);
}

function getRGBforCYMKobject(cmyk){
  var cyan  = getRGBforColorAtOpacity(cyanColor, (cmyk.cyan / 100)),
      mag   = getRGBforColorAtOpacity(magentaColor, (cmyk.mag / 100)),
      yel   = getRGBforColorAtOpacity(yellowColor, (cmyk.yel / 100)),
      black = getRGBforColorAtOpacity(blackColor, (cmyk.black / 100));
  return multiplyRGBColors(cyan, mag, yel, black);
}
