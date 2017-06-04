// color controller

/* this element:
  - generates and random cmyk or rgb colors
  - transforms rgb, cmyk and lab
*/

var color = (function(){

  // CMYK colors
  var cDef = {r:0,   g:163, b:218},
      mDef = {r:216, g:18,  b:125},
      yDef = {r:255, g:240, b:3  },
      kDef = {r:10,  g:10,  b:10 };


  // get a random RGB tryad
  function setRandomRGB(){
    var newRed = Math.round(Math.random() * 255),
        newGreen = Math.round(Math.random() * 255),
        newBlue = Math.round(Math.random() * 255);

    var newRandomRGB = {
      red : newRed,
      green : newGreen,
      blue : newBlue
    };

    return newRandomRGB;
  }

  // get a random CMYK tetrad
  function setRandomCMYK(){
    var newC = Math.round(Math.random() * 100),
        newM = Math.round(Math.random() * 100),
        newY = Math.round(Math.random() * 100),
        newK = Math.round(Math.random() * 100);

    var newRandomCMYK = {
      c : newC,
      m : newM,
      y : newY,
      k : newK
    };

    return newRandomCMYK;
  }

  function multiplyRGBColors(cyan, magenta, yellow, black){
    var red   = ((cyan.r * magenta.r / 255) * yellow.r / 255) * black.r / 255,
        green = ((cyan.g * magenta.g / 255) * yellow.g / 255) * black.g / 255,
        blue  = ((cyan.b * magenta.b / 255) * yellow.b / 255) * black.b / 255;

    return {r : Math.round(red), g : Math.round(green), b : Math.round(blue)};
  }

  function getRGBforColorAtOpacity(color, opacity){

    var color = {
      r : color.r + (255 - color.r) * (1 - opacity),
      g : color.g + (255 - color.g) * (1 - opacity),
      b : color.b + (255 - color.b) * (1 - opacity)
    }

    return color;

  }

  // transform CMYK into representable RGB
  // get the rgb value from the cymk
  function getRGBforCYMK(_cyan, _magenta, _yellow, _black){
    var c = getRGBforColorAtOpacity(cDef, _cyan),
        m = getRGBforColorAtOpacity(mDef, _magenta),
        y = getRGBforColorAtOpacity(yDef, _yellow),
        b = getRGBforColorAtOpacity(kDef, _black);

    return multiplyRGBColors(c, m, y, k);
  }

  function getRGBforCYMKobject(color){
    var c = getRGBforColorAtOpacity(cDef, (color.c / 100)),
        m = getRGBforColorAtOpacity(mDef, (color.m / 100)),
        y = getRGBforColorAtOpacity(yDef, (color.y / 100)),
        k = getRGBforColorAtOpacity(kDef, (color.k / 100));
    return multiplyRGBColors(c, m, y, k);
  }


  // Get a LAB array from RGB values
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

  // Get a LAB array from RGB array
  function getLABfromRGBobject(rgb) {
    return getLABfromRGB(rgb.r, rgb.g, rgb.b);
  }

  return {
    setRandomRGB            : setRandomRGB,
    setRandomCMYK           : setRandomCMYK,
    multiplyRGBColors       : multiplyRGBColors,
    getRGBforColorAtOpacity : getRGBforColorAtOpacity,
    getRGBforCYMK           : getRGBforCYMK,
    getLABfromRGBobject     : getLABfromRGBobject,
    getRGBforCYMKobject     : getRGBforCYMKobject
  }

})()
