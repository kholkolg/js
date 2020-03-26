//always working
$(function animate() {
        console.log("in function");
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
});
function gameover(){
	console.log("function complete");
    document.getElementById("box").className="invisible";
    console.log("GAME OVER!");
};

//hide box when clicked
function hide(){
    console.log("box clicked");
	document.getElementById("box").className="invisible";
	document.getElementById("box").style.marginLeft = "10%";
    
}

