function fxGetGameLevels (){
   var levels = [
     {
       "description"  : "Basico I",
       "difficulty"    : 0
     },
     {
       "description"  : "Basico II",
       "difficulty"    : 0
     },
     {
       "description"  : "Facil I",
       "difficulty"    : 1
     },
     {
       "description"  : "Facil II",
       "difficulty"    : 1
     },
     {
       "description"  : "Medio I",
       "difficulty"    : 2
     },
     {
       "description"  : "Medio II",
       "difficulty"    : 2
     },
     {
       "description"  : "Dificil I",
       "difficulty"    : 3
     },
     {
       "description"  : "Dificil II",
       "difficulty"    : 3
     },
     {
       "description"  : "Extremo I",
       "difficulty"    : 4
     },
     {
       "description"  : "Extremo II",
       "difficulty"    : 4
     }
   ]

   return levels;
}

function fxGameBegin () {

  var currentLevel = 0;

  var newGame = {
    title : gameLevels[currentLevel].description,
    level : 0,
    score : 0,
    difficulty : gameLevels[currentLevel].difficulty
  }

  updateInfoForGame( newGame );

  targetCYMK = getRandomColorForDifficulty(newGame.difficulty);
  updateTargetToCMYK(targetCYMK);

  return newGame;

}

function fxGameNextLevel (){

  if (currentGame) {

    if (currentGame.level <= 9) {
      currentGame.level ++;
      currentGame.title = gameLevels[currentGame.level].description;
      currentGame.difficulty = gameLevels[currentGame.level].difficulty;

      updateInfoForGame (currentGame);

      targetCYMK = getRandomColorForDifficulty(currentGame.difficulty);
      updateTargetToCMYK(targetCYMK);

      console.log("current level: " + currentGame.level);
    } else {
      console.log("game done");
    }

  }

};
