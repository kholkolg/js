function timer(){
	document.innerHTML = "move ";
	var box1=document.getElementById("b1");
	var box2=document.getElementById("b2");
	var box3=document.getElementById("b3");
	
	
	
    var move = "";
    if (box1.css('left') == "10px") {
        move = "+=" + ($("#edge").width() - 35);
    } else {
        move = "-=" + ($("#edge").width() - 35);
    }
	
    $(".box").animate({left: move }, 500,
					  function() {
            			if (box1.css('left') == "475px") {
                			$(this).css('background', '#afa799');
            			} else {
							box1.css('background', '#f8a2a4');
							box2.css('background', '#a2f8a4');
							box2.css('background', '#5599fd');
            			}

        });
    };
