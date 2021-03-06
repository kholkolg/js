//global variables
var mImg = '';
var mImages = [];
var currentScore = 0;
var state = 0;
var scoreFile = null;
var scores = null;
var nickname = prompt("Enter your name");

// game functions
function newGame() {
	console.log("newGame, state "+ state);
	
	//check if game was running (removes listeners)
	if (state == 1){
		stopMonsters();
	}
	currentScore = 0;

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
	for (i = 0; i < dots.length; i++) {
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
	//save it to highscores
	saveScore(currentScore);

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

function readScore(input){
    console.log("readScore " + input);
		
	if (input.files && input.files[0]) {
		scoreFile =  input.files[0];
		console.log('scoreFile '+ scoreFile);
		
        var reader = new FileReader();
	    reader.onload = function(evt) {
	    	console.log('reader onload');
			scores = evt.target.result;
			console.log("scores  " + scores);
	  };
	reader.readAsText(input.files[0]);
 
	// if you want to put the highscores somewhere on the screen
	// the text is in variable scores
	

}}


function saveScore(score){
	console.log("writeScore  " + score);
	
	if(scoreFile){
		console.log('score file ' + scoreFile);
	 	var string = nickname + ' ' + score + '\n';
		var text = scores + string;
		console.log(text);
		
		var data = new Blob([text], {type: 'text/plain'});

		// If we are replacing a previously generated file we need to
		// manually revoke the object URL to avoid memory leaks.
        window.URL.revokeObjectURL(scoreFile);
  		scoreFile = window.URL.createObjectURL(data);
        var link = document.getElementById('link');
        link.href = scoreFile;
		link.style.display = 'block';
	}
	else {
		console.log("no score file is selected");
	}
}

function readURL(input){
    console.log("readUrl");
    stopMonsters();
	var files = input.files;
	var numMonsters = files.length;
	console.log("num pictures "+numMonsters);
	if (files) {
       console.log(files);
       var reader = new FileReader();
       reader.onload = function(e) {
		   console.log('reader onload');
       $('#dot').attr('src', e.target.result);
      };
	var imageInd = Math.floor(Math.random()*numMonsters);
    reader.readAsDataURL(input.files[imageInd]);
	console.log("image " + input.files[imageInd]);
	}
	else {
		console.log('Default monster image');
		//return default monster;
		//if no files are selected, choose default monster img
		//mImg = readImage('default_monster.png');
	}
	
	
//   var image = document.getElementById("monster");
//   image.id = "box";
//   if (input.files && input.files[0]) {
 //     console.log("reader");
//      var reader = new FileReader();

//      reader.onload = function(e) {
//         $('#box').attr('src', e.target.result);
//      };

//      reader.readAsDataURL(input.files[0]); // convert to base64 string
//   }
	
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

