//Words in the game
var words = ["strange", "eerie", "wraith", "specter", "haunt", "uncanny", "eldritch", "weird", "bizarre", "dreadful", "terror"];
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var userGuesses = [];
var count = 6;

$(document).ready(function() {     

  var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "assets/songs/clockwork.mp3");
      audioElement.play();
      $("#theme-button").text("Pause Music");

    $("#theme-button").on("click", function() {
          if (!audioElement.paused) {
            audioElement.pause();           
            $("#theme-button").text("Play Music");
        } else {
            audioElement.play();           
          $("#theme-button").text("Pause Music");
      }
  });
});
//Make theme starts on load

function createLetterButtons() {

      for (var i=0; i<letters.length; i++) {
        var letterBtn = $("<button>");
        letterBtn.addClass("letter-button letter letter-button-color");
        letterBtn.attr("data-letter", letters[i]);
        letterBtn.text(letters[i]);
        $("#buttons").append(letterBtn);

      }

      $(".letter-button").on("click", function(){
      	if($("*#hidden-letter-" + $(this).attr("data-letter")).length !== 0){
      		$("*#hidden-letter-" + $(this).attr("data-letter")).text($(this).attr("data-letter"));
          $(this).remove();
          if($("#blank-word").children().text().indexOf("_") == -1){
          $("#buttons").remove();
          $("#title").text("Maybe death isn't the end");
          $("#title").append("<br><button onclick='reloadPage()'>Play Again!</button>");
          }
      		
      		//End the game if word is correct!
      	}else{
      		count -= 1;
	      	$("#wrong-letters").append($(this).attr("data-letter")); //FIXED!
	      	console.log(count);
	        if(count==0){
	        	$("#buttons").remove();
	        	$("#title").text("Life is too short");
	        	$("#title").append("<br><button onclick='reloadPage()'>Play Again!</button>");
	        }
	      	$(this).remove();
      	}
      	
      	
	})
};

function chooseWord () {
    var word = words[Math.floor(Math.random() * words.length)];
    hiddenWord(word.toUpperCase());
}

function hiddenWord (word) {  
	$.each(word.split(""), function (i, el) {
        $("#blank-word").append("<span id='hidden-letter-" + el + "'>_</span");
    });
	
 }

 function reloadPage() {
    location.reload();
}


