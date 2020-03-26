//always working
$(function animate() {
    console.log("in function");
	$("#box").click(function(){
		respawn();
		}); 
    $("#box").animate({
		marginLeft: "90%"
        }, {
            duration: 10000,
            easing: "linear",
            complete: function () {
				gameover();
            }
        });
});

function gameover(){
	console.log("function complete");
    document.getElementById("box").className="invisible";
    console.log("GAME OVER!");
};

function respawn(){
	console.log("stop animation");
     $("#box").stop();
	console.log("restart animate");
	document.getElementById("box").style.marginLeft = "0px"
	 $("#box").animate({
            marginLeft: "90%"
        }, {
            duration: 10000,
            easing: "linear",
            complete: function () {
				// 
				gameover();
            }
        });
}


//hide box when clicked
//function hide(){
//$("#box").stop();
	//document.getElementById("box").break();
	//document.getElementById("box").className="invisible";
//;}

