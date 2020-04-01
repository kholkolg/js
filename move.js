//global variables
var mImg = '';
var mImages = [];
var currentScore = 0;
var state = 0;


// game functions
function newGame() {
	console.log("newGame, state "+ state);
	
	//check if game was running (removes listeners)
	if (state == 1){
		stopMonsters();
	}
	currentScore = 0;
	
	//TODO image for monster
	//var mImg = chooseMonsterImg();
	//console.log("chosen monster: "+mImg);

	postScore();
	state = 1;
	//put monsters to the left border
	putMonstersToStart();
	//start animation
	animateMonsters();
}

function postScore(){
	// outputs current score
	document.getElementById('currentScore').innerHTML = '<ul>' + currentScore + '</ul>';
}

function pauseResumeGame(){
	//console.log("pauseResume state "+ state);
	if (state == 1){
		stopMonsters();	
		state = 2;
	}
	else if (state == 2){
		animateMonsters();
		state = 1;
	}
}

function putMonstersToStart(){
	var dots = document.getElementsByClassName("dot");
	//console.log("put to start, num dots: " + dots.length);
	for (i = 0; i < dots.length; i++) {
		//console.log(dots[i]);
		dots[i].style.marginLeft = "0px";
	}
} 

function animateMonsters(){
	var dots = document.getElementsByClassName("dot");
	for (i = 0; i < dots.length; i++) {
		animateMonster(dots[i]);
	}
}

function gameover(){
	console.log("GAME OVER!");
	stopMonsters();
	state = 0;

	document.getElementById('currentScore').innerHTML = '<ul> GAME OVER!</ul> <ul> Your score: '+currentScore + '</ul>';
	var thisScore = currentScore;
	
	//save it to highscores
	// saveScore(thisScore);

}

function stopMonsters(){ 
	//stop all monsters and detach listeners
	$(".dot").stop();
	$(".dot").off();
}


function getDuration(){
	//Get some random animation duration for monster
	return Math.round(400000*Math.random()/(currentScore+1));
}


function animateMonster(monster){
	console.log('animateMonster ', monster);
	
	//attach listener
	$(monster).click(function(){
	respawn(this.id);
		}); 

	$(monster).animate({
		marginLeft: "90%"
        }, {
            duration: getDuration(),
            easing: "linear",
            complete: function () {
				gameover();
            }
        });
}

function respawn(monsterId){
	console.log("respawn " + monsterId);
	//console.log(document.getElementById(monsterId));
	var monster =  document.getElementById(monsterId);

	//stop animation, make monster invisible
	$(monster).stop();
	$(monster).off();

	currentScore += 1;
	document.getElementById('currentScore').innerHTML = '<ul>' + currentScore + '</ul>';
	
	monster.style.marginLeft = "0px"; 
	animateMonster(monster);
}


function readURL(input){
   console.log("readUrl");
   stopMonsters();
   var image = document.getElementById("monster");
   image.id = "box";
   if (input.files && input.files[0]) {
      console.log("reader");
      var reader = new FileReader();

      reader.onload = function(e) {
         $('#box').attr('src', e.target.result);
      };

      reader.readAsDataURL(input.files[0]); // convert to base64 string
   }
}


// Not used, should be calle in new game or animate
// depending on if monster is chosen once for the whole game
// or at each respawn
function chooseMonsterImg(){
	//filter images
	//var files = document.getElementById("files");
	console.log(files);
	var numMonsters = mImages.length;
	console.log("num pictures "+numMonsters);
	if (files.length == 0){
		console.log('Default monster image');
		//return default monster;
		//if no files are selected, choose default monster img
		//mImg = readImage('default_monster.png');
	}
	var monsterId = Math.floor(Math.random()*numMonsters);
	console.log('selected monster id '+monsterId);
	var monster = mImages[monsterId];
	console.log(monster);
	return monster
}





//hide box when clicked
//function hide(){
//$("#box").stop();
	//document.getElementById("box").break();
	//document.getElementById("box").className="invisible";
//}


//always working (starts directly w/o button)
//$(function animate() {
//    console.log("in function");
//	$("#box").click(function(){
//		respawn();
//		}); 
//    $("#box").animate({
//		marginLeft: "90%"
//        }, {
//           duration: 10000,
//           easing: "linear",
//           complete: function () {
//				gameover();
//            }
//        });
//});
	
	
//	var dots = document.getElementsByClassName("dot");
//	console.log("num dots: " + dots.length);
//	for (i = 0; i < dots.length; i++) {
//		console.log(dots[i]);
//  		dots[i].style.marginLeft = "0px";
	//	dots[i].className ="alive";
//	} 
	
	
	//function that respawns monster at start location when it's clicked
	
	//make it visible at initial location
//	document.getElementById("dot").style.marginLeft = "0px"
  //  document.getElementById("dot").className="alive";

