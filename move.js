//always working
$(function animate() {
        console.log("in function");
        $("#box").animate({
            marginLeft: "90%"
        }, {
            duration: 10000,
            easing: "linear",
            complete: function () {
                $("#box").animate({
                    marginLeft: "10%",
                    marginRight: "90%"
                }, {
                    duration: 10000,
                    easing: "linear",
                    complete: function () {
                        //continue moving
                        animate();
                    }
                });
            }
        });
});


//hide box when clicked
function hide(){
    console.log("box clicked");
    document.getElementById("box").className="invisible";
}

