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


var mImg = '';
var mImages = [];
var currentScore = 0;


// game functions
function newGame() {
	
	//shows monster at it's start position, and starts animation
    console.log("new game started");
	currentScore = 0;
	//var mImg = chooseMonsterImg();
	//console.log("chosen monster: "+mImg);
	
	
//	var dots = document.getElementsByClassName("dot");
//	console.log("num dots: " + dots.length);
//	for (i = 0; i < dots.length; i++) {
//		console.log(dots[i]);
//  		dots[i].style.marginLeft = "0px";
	//	dots[i].className ="alive";
//	} 
	
	
	//function that respawns monster at start location when it's clicked
	$(".dot").click(function(){
		console.log("click dot");
		respawn(this.id);
		}); 
	//make it visible at initial location
//	document.getElementById("dot").style.marginLeft = "0px"
  //  document.getElementById("dot").className="alive";

	// scores??
	// independent start by id with different speed
	document.getElementById('currentScore').innerHTML = '<ul>' + currentScore + '</ul>';
	//start animation
	var dots = document.getElementsByClassName("dot");
	console.log("num dots: " + dots.length);
	for (i = 0; i < dots.length; i++) {
		console.log(dots[i]);
		dots[i].style.marginLeft = "0px";
		animateMonster(dots[i]);

	} 
	

}


function stopGame(){ 
	//TODO add two states pressed-unpressed to pause-unpause the game
	console.log('stopGame');
	$(".dot").stop();
	//var box = document.getElementById("box").className="dead";
	

}


function gameover(){
	stopGame();
    console.log("GAME OVER!");
	document.getElementById('currentScore').innerHTML = '<ul> GAME OVER!</ul> <ul> Your score: '+currentScore + '</ul>';
	var thisScore = currentScore;
	//save it to highscores
	currentScore = 0;
}

function getDuration(){
	var dur = Math.round(40000*Math.random());
	console.log("duration: " + dur);
	return dur;
}

function animateMonster(monster){
	var speed = getDuration();
	console.log('animateMonster ', monster);

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


function respawn(monster){
	console.log("respawn " +monster);
	//stop animation, make monster invisible
	//monster.className="dead";
	$(monster).stop()
	//$("#box").stop();
	currentScore += 1;//??? it's incremented not by one, but by num of game after page reload
	
	
	document.getElementById('currentScore').innerHTML = '<ul>' + currentScore + '</ul>';
	console.log("moster is killed, score "+currentScore);
	


	document.getElementById(monster).style.marginLeft = "0px"
	console.log("restart animation ", monster);
	animateMonster(monster);
	
	//document.getElementById(monster).className="alive";
	// $("#dot")
//	$(monster).animate({
 //           marginLeft: "90%"
 //       }, {
 //           duration: getDuration(),
 //           easing: "linear",
 //           complete: function () {
//				// 
//				gameover();
 //           }
 //       });
}


function readURL(input){
   console.log("readUrl");
	// FIXME dot class 
   document.getElementById("box").className="dead";
   document.getElementById("box").id="deadMonster";
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

