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
	var mImg = chooseMonsterImg();
	console.log("chosen monster: "+mImg);

	//function that respawns monster at start location when it's clicked
	$("#box").click(function(){
		respawn();
		}); 
	//make it visible at initial location
	document.getElementById("box").style.marginLeft = "0px"
    document.getElementById("box").className="alive";
	// listener??
	document.getElementById('currentScore').innerHTML = '<ul>' + currentScore + '</ul>';
	//start animation
    $("#box").animate({
		marginLeft: "90%"
        }, {
            duration: getDuration(),
            easing: "linear",
            complete: function () {
				gameover();
            }
        });
}


function stopGame(){ 
	console.log('stopGame');
	$("#box").stop();
	var box = document.getElementById("box").className="dead";
	

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
	var dur = Math.round(10000*Math.random());
	console.log("duration: " + dur);
	return dur;
}


function respawn(){
	console.log('respawn '+evt);
	//stop animation, make monster invisible
	document.getElementById("box").className="dead";
	$("#box").stop();
	currentScore = (currentScore + 1);
	
	//update score
	document.getElementById('currentScore').innerHTML = '<ul>' + currentScore + '</ul>';
	console.log("moster is killed, score "+currentScore);
	
	console.log("restart animation");
	document.getElementById("box").style.marginLeft = "0px"
	document.getElementById("box").className="alive";
	 $("#box").animate({
            marginLeft: "90%"
        }, {
            duration: getDuration(),
            easing: "linear",
            complete: function () {
				// 
				gameover();
            }
        });
}




// file selection to choose monster image
function handleFileSelect(evt) {
	 // FileList object
	console.log("file selector");
    var files  = evt.target.files;
	for (var i = 0, f; f = files[i]; i++) {
         mImages.push(f.name);
    }
	console.log(mImages);
    document.getElementById('files').addEventListener('change', handleFileSelect, false);

}

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

