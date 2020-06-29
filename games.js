var buttonColors = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickedPattern = [];

var start = false;
var level = 0;

$(document).keypress(function(){
  if(start != true){
    $("#level-title").text("Level " + level);
    nextSequence();
    start = true;
  }
})

$(".btn").click(function(){
  var userChoosenColor = $(this).attr("id");

  userClickedPattern.push(userChoosenColor);
//  console.log(userClickedPattern);
  playSound(userChoosenColor);
  animatePress($(this));
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor((Math.random() * 4) );
  var randomColorChoosen = buttonColors[randomNumber];
  gamePattern.push(randomColorChoosen);

  $("#"+ randomColorChoosen).fadeOut(100).fadeIn(100)

  playSound(randomColorChoosen)
}
function playSound( color){
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}
function animatePress(color){
  color.addClass("pressed");
  setTimeout(function(){
    color.removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }
  else{
    console.log("Failure");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  level = 0;
  gamePattern = [];
  start = false;

}
