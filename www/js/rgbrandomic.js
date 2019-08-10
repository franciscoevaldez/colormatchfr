

// convertir HSV a RGB
/* accepts parameters
* h  Object = {h:x, s:y, v:z}
* OR 
* h, s, v
*/
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

// RANDOM ENTRE RANGO
function getRandom(minV,maxV){
    var ceil = maxV - minV;
    var rand = Math.random();
    var nuNumber = Math.floor( rand * ceil ) + minV
    return nuNumber;
}

// RANDOM FACIL
function getEasyColor(){
    var h,s,v;

    h = getRandom(0, 359);
    s = getRandom(95, 99);
    v = getRandom(95, 99);

    //console.log(nuColor);
    return {h: h, s:s, v:v};
}

// RANDOM MEDIO
function getMediumColor(){
    var h,s,v, 
    valorVolatil, valorTranca,
    boolrand;

    valorTranca = getRandom(95,99);
    valorVolatil = getRandom( (150-valorTranca) ,95)
    boolrand = getRandom(0,1)

    h = getRandom(0, 359);
    if(boolrand){
        s = valorTranca;
        v = valorVolatil;
    } else {
        s = valorVolatil;
        v = valorTranca;
    }

    var nuColor = {h: h, s:s, v:v};
    //console.log(nuColor);
    return nuColor;
}

// RANDOM DIFICIL
function getHardColor(){
    var h,s,v, 
    valorPrimero, valorSegundo,
    boolrand;

    valorPrimero = getRandom(30,95);
    var techoSegundo = (valorPrimero < 55) ? 95 : (150-valorPrimero)
    valorSegundo = getRandom(30, techoSegundo)
    boolrand = getRandom(0,1)

    h = getRandom(0, 359);
    if(boolrand){
        s = valorPrimero;
        v = valorSegundo;
    } else {
        s = valorSegundo;
        v = valorPrimero;
    }

    var nuColor = {h: h, s:s, v:v};
    //console.log(nuColor);
    return nuColor;
}

function getAnyColor(){
    var whichRandom = Math.floor(getRandom(1,4));
    var nuHSV;

    if (whichRandom == 1) {
        nuHSV = getEasyColor()
    } else if (whichRandom == 2){
        nuHSV = getMediumColor()
    } else {
        nuHSV = getHardColor()
    };

    var nuH = nuHSV.h,
        nuS = nuHSV.s,
        nuV = nuHSV.v;

    var nuRGB = HSVtoRGB(nuHSV.h/359, nuHSV.s/100, nuHSV.v/100);

    var nuColor = {
        rgb : nuRGB,
        difficulty : whichRandom
    }

    //var nuRGB = HSVtoRGB(nuH, nuS, nuV);
    return nuColor;

}



var rgbRandomic = {

    newEasy     : getEasyColor,
    newMedium   : getMediumColor,
    newHard     : getHardColor,

}