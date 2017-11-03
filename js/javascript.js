$(document).ready(function(){
  function getRandNumber(max, min = 1) {
    return Math.floor((Math.random() * max) + min);
  }
  function checkPos(maxX, maxY) {  // pour générer un monstre et eviter que les enemies arrive directement sur nous au lancement de la partie
    var flag = false;
    var it = 0;
    while (!flag) {
      it ++;
      var x = getRandNumber(maxX);
      var y = getRandNumber(maxY);
      console.log(x);
      console.log(y);
      console.log("iteration = " + it);
      console.log("-------------");
      if(x !== JSON.parse(localStorage.getItem('playerPos')).x && y !== JSON.parse(localStorage.getItem('playerPos')).y ) {
        if(x !== JSON.parse(localStorage.getItem('goalPos')).x && y !== JSON.parse(localStorage.getItem('goalPos')).y) {
          flag = true;
          return {
            "x": x,
            "y": y
          };
        }
      }
    }
  }
  function init() {
    if (localStorage.getItem("gameState") == null) {
      localStorage.setItem('gameState', "optionScreen");
      displayScreen(localStorage.getItem("gameState"));
    }

    else{
      if (localStorage.getItem("gameState") == "gameScreen") {
        generateGame();
      }
      displayScreen(localStorage.getItem('gameState'));
    }
  }
  function generateGame(){ // function recuperer les axes dans le stockage
    var baseX = JSON.parse(localStorage.getItem("gameAxes")).x;
    var baseY = JSON.parse(localStorage.getItem("gameAxes")).y;
    var playScreen = $("section[data-state='gameScreen']");
    var html ="<div style='width:"   + (baseX * 22) + "px;' class='gameContainer'>";
    for (var y = 1; y <= baseY; y++) {
      for (var x = 1; x <= baseX; x++) {
        html +="<div data-x ='" + x + "' data-y ='" + y + "' class='gameDiv'></div>";
      };
    };
    html +="</div>";
    $(playScreen).html(html);
    insertObjects();
  }
  function insertObjects(){ // function pour placer le joueurs au debut de la partie
    if (localStorage.getItem('playerPos') == null) {
      var pos = {
        "x": 1,
        "y": 1
      };
      localStorage.setItem('playerPos', JSON.stringify(pos))
    }
    if (localStorage.getItem('goalPos') == null) {
      var pos = {
        "x": JSON.parse(localStorage.getItem('gameAxes')).x,
        "y": JSON.parse(localStorage.getItem('gameAxes')).y
      };
      localStorage.setItem('goalPos', JSON.stringify(pos))
    };
    if (localStorage.getItem("monsterPos") == null) { // génération des monstres
      var pos = checkPos(JSON.parse(localStorage.getItem("gameAxes")).x, JSON.parse(localStorage.getItem("gameAxes")).y);
      localStorage.setItem("monsterPos", JSON.stringify(pos));
    }
    var playerPos = JSON.parse(localStorage.getItem('playerPos'));
    var goalPos = JSON.parse(localStorage.getItem('goalPos'));
    var monsterPos = JSON.parse(localStorage.getItem('monsterPos'));
    $(".gameDiv[data-x= '" + playerPos.x + "' ][data-y= '" + playerPos.y + "' ]").html('<img style=width:100%; height:100%; src="../alien.png">');
    $(".gameDiv[data-x= '" + goalPos.x + "' ][data-y= '" + goalPos.y + "' ]").html('<img style=width:100%; height:100%; src="../coeur.gif">');
    $(".gameDiv[data-x= '" + monsterPos.x + "' ][data-y= '" + monsterPos.y + "' ]").html('<img style=width:100%; height:100%; src="../montre.jpg">');
    $('body').on('keydown', function(e){
      if (e.keyCode == 38) {
        movePlayer('UP');
      }else if (e.keyCode == 40) {
        movePlayer('DOWN');
      }else if (e.keyCode == 37) {
        movePlayer('LEFT');
      }else if (e.keyCode == 39) {
        movePlayer('RIGHT');
      }
    })
  }
  function checkvictory(){
    if(JSON.parse(localStorage.getItem('playerPos')).x == JSON.parse(localStorage.getItem('goalPos')).x && JSON.parse(localStorage.getItem('playerPos')).y == JSON.parse(localStorage.getItem('goalPos')).y) {
      displayScreen('victory');
      localStorage.setItem('gameState', 'victory');
    }
  };
  function movePlayer(direction) { // deplacement du joueurs
    var currentPlayerPos = JSON.parse(localStorage.getItem('playerPos'));
    var gameSize = JSON.parse(localStorage.getItem('gameAxes'));
    if(direction == "UP") {
      if((currentPlayerPos.y - 1) > 0) { // deplacement du joueurs en haut
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.y -= 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%;height:100%;" src="../alien.png">');
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
        checkvictory();
      } else {
        console.log('aie !');

      }
    } else if(direction == "DOWN") { // deplacement du joueur en bas
      if((currentPlayerPos.y + 1) <= gameSize.y) {
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.y += 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%;height:100%;" src="../alien.png">');
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
        checkvictory();
      } else {
        console.log('aie !');
      }
    } else if(direction == "LEFT") {
      if((currentPlayerPos.x - 1) > 0) { // deplacement du joueurs à droite
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.x -= 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%;height:100%;" src="../alien.png">');
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
        checkvictory();
      } else {
        console.log('aie !');
      }
    } else if(direction == "RIGHT") {
      if((currentPlayerPos.x + 1) <= gameSize.x) { // deplacement du joueurs à gauche
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('');
        currentPlayerPos.x += 1;
        $('.gameDiv[data-x="' + currentPlayerPos.x + '"][data-y="' + currentPlayerPos.y + '"]').html('<img style="width:100%;height:100%;" src="../alien.png">');
        localStorage.setItem('playerPos', JSON.stringify(currentPlayerPos));
        checkvictory();
      } else {
        console.log('aie !');
      }
    }
    console.log("je me deplace");
    mouveMonster();

    while(JSON.parse(localStorage.getItem('monsterPos')).x == JSON.parse(localStorage.getItem('goalPos')).x && JSON.parse(localStorage.getItem('monsterPos')).y == JSON.parse(localStorage.getItem('goalPos')).y) {
      moveMonster();
      $('.gameDiv[data-x="' + JSON.parse(localStorage.getItem('goalPos')).x + '"][data-y="' + JSON.parse(localStorage.getItem('goalPos')).y + '"]').html('<img style="width:100%;height:100%;" src="/img/goal.png">');
    }
  }
  function mouveMonster() { // deplacement du monstre
    var currentMonsterPos = JSON.parse(localStorage.getItem("monsterPos"));
    var gameSize = JSON.parse(localStorage.getItem('gameAxes'));
    if(getRandNumber(2) == 1) { // je suis sur l'axe Y
    if (getRandNumber(2) == 1) { // pour aller en haut
      if((currentMonsterPos.y - 1) > 0) {
        $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('');
        currentMonsterPos.y -= 1;
        $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('<img style="width:100%;height:100%;" src="../montre.jpg">');
        localStorage.setItem('monsterPos', JSON.stringify(currentMonsterPos));
        checkDefeat();
      } else {
        console.log('aie !');
      }
    }else {
      if((currentMonsterPos.y + 1) <= gameSize.y) { // pour aller en bas
        $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('');
        currentMonsterPos.y += 1;
        $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('<img style="width:100%;height:100%;" src="../montre.jpg">');
        localStorage.setItem('monsterPos', JSON.stringify(currentMonsterPos));
        checkDefeat();
      } else {
        console.log('aie !');
      }
    }
  }
  else {
    if (getRandNumber(2) == 1) {
      if((currentMonsterPos.x + 1) <= gameSize.x) { // pour aller a droite !
        $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('');
        currentMonsterPos.x += 1;
        $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('<img style="width:100%;height:100%;" src="../montre.jpg">');
        localStorage.setItem('monsterPos', JSON.stringify(currentMonsterPos));
        checkDefeat();
      } else {
        console.log('aie !');
      }
    }else {
      if((currentMonsterPos.x - 1) > 0) { // pour aller à gauche
        $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('');
        currentMonsterPos.x -= 1;
        $('.gameDiv[data-x="' + currentMonsterPos.x + '"][data-y="' + currentMonsterPos.y + '"]').html('<img style="width:100%;height:100%;" src="../montre.jpg">');
        localStorage.setItem('monsterPos', JSON.stringify(currentMonsterPos));
        checkDefeat();
      } else {
        console.log('aie !');
      }
    }
  }
}
function checkDefeat() { // message pour la defaite si le joueurs tombe sur le monstre
  var playerPos = JSON.parse(localStorage.getItem('playerPos'));
  var monsterPos = JSON.parse(localStorage.getItem('monsterPos'));
  if (playerPos.x == monsterPos.x && playerPos.y == monsterPos.y) {
    displayScreen("defeat");
    localStorage.setItem("gameState", "defeat");
  }
  // if(JSON.parse(localStorage.getItem('playerPos')).x == JSON.parse(localStorage.getItem('monsterPos')).x && JSON.parse(localStorage.getItem('playerPos')).y == JSON.parse(localStorage.getItem('monsterPos')).y) {
  //   displayScreen('defeat');
  //   localStorage.setItem('gameState', 'defeat');
  //  }
}
function displayScreen(gameState) {
  $.each($("section[data-state!='" + gameState + "']"), function(key, value){
    $(this).addClass("hidden"); // ajout de chaque element a la class  hidden
  })
  $("section[data-state!='" + gameState + "']").addClass('hidden'); // Si n'est pas egal à localStorage
  $("section[data-state='" + gameState + "']").removeClass('hidden'); // Si c'est égal à localStorage
}
// les boutons (reset et start-game)
$("button[data-action='startGame']").on('click', function(){  // function qui sert a lancer le jeu et verifier si detecte si x ou y sont entrer correctement
  var baseX = $("input[name='x']").val();
  var baseY = $("input[name='y']").val();
  if (baseX == "" || baseY =="") {
    alert('erreur valeur x ou y');
  } else {
    var axes = {  // permet de recuperer x & y
      "x": baseX,
      "y": baseY
    };
    localStorage.setItem("gameAxes", JSON.stringify(axes)); // stock x & y dans gameAxes
    localStorage.setItem("gameState", "gameScreen"); // sert a afficher le jeu sans recharger la page
    generateGame();
    displayScreen(localStorage.getItem("gameState"));
  }
})
$("button[data-action='reset']").on('click', function(){ // function qui permet remettre la page à zero
  localStorage.clear();
  location.reload();
});
init();
});
