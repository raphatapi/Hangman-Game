//Declair variables for words, letters, answer and count(max number of guesses)

var words = ["strange", "eerie", "wraith", "specter", "haunt", "uncanny", "eldritch", "weird", "bizarre", "dreadful", "terror"];
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var count = 6;
var answer = "";

//Start music #1, display starting count, pick hidden word/answer and create letter buttons when page loads
$(document).ready(function() {

  //#1 Create audio element (Captain Planet activity)
  var audioElement = document.createElement("audio");
      audioElement.setAttribute("src", "assets/songs/clockwork.mp3");
      audioElement.play();
      $("#theme-button").text("Pause Music");

    //Use button to toggle music on/off
    $("#theme-button").on("click", function() {
          //If it's not paused then pause it and change button text to "Play Music"
          if (!audioElement.paused) {
            audioElement.pause();           
            $("#theme-button").text("Play Music");
          //Or do the opposite
        } else {
            audioElement.play();           
          $("#theme-button").text("Pause Music");
        }
      });
    //#2 Display starting count
    $("#count").text(count);

  //#3 Pick the hidden word and hide it
  chooseWord();
  //#4 Create letter buttons
  createLetterButtons();
});


//Create letter buttons (Fridge Game)
function createLetterButtons() {

      for (var i=0; i<letters.length; i++) {
        //Create a button element on the DOM
        var letterBtn = $("<button>");
        letterBtn.addClass("letter-button letter letter-button-color");
        //Adding an atribute of the letters value
        letterBtn.attr("data-letter", letters[i]);
        letterBtn.text(letters[i]);
        $("#buttons").append(letterBtn);

      }

      //Add click event to the letter buttons
      $(".letter-button").on("click", function(){
        // * selects all hidden letters that match user input
        //If any matches are found the length will be greater than 0
      	if($("*#hidden-letter-" + $(this).attr("data-letter")).length !== 0){ 
          console.log($("*#hidden-letter-" + $(this).attr("data-letter")).length)
      		$("*#hidden-letter-" + $(this).attr("data-letter")).text($(this).attr("data-letter"));
          $(this).remove();//Removes button from the DOM

          //End game when last correct letter is chosen
        if($("#blank-word").children().text().indexOf("_ ") == -1){
          $("#buttons").remove();
          $("#title").text("Death isn't the end"); //User wins
          $("#play").append("<br><button onclick='reloadPage()'>Play Again!</button>"); //Restart game
          }
          //Wrong guess and check if user lost
      		//Decrement count and remove wrong choice and store it under wrong choice once choice is zero
      	}else{
      		count -= 1;

	      	$("#wrong-letters").append($(this).attr("data-letter")); //FIXED!
          $("#count").text(count);
	        if(count==0){
            //Set all children that have text = _ to their hidden letter value
            //

            $("#blank-word").replaceWith(answer);
	        	$("#buttons").remove();
	        	$("#title").text("Life is too short"); //Game over
	        	$("#play").append("<br><button onclick='reloadPage()'>Play Again!</button>");//Restart game
	        }
	      	$(this).remove(); //Removes letters choices leftover
      	}
      	
      	
	})
};

//Randomly chooses word and convert it to upper case
function chooseWord () {
    var word = words[Math.floor(Math.random() * words.length)];
    answer = word.toUpperCase();
    hiddenWord(word.toUpperCase());
}

//Creates the span element with the underscore for each letter of the hidden word
function hiddenWord (word) {
  //Splits the string between each character
	$.each(word.split(""), function (i, el) {
        $("#blank-word").append("<span id='hidden-letter-" + el + "'>_ </span");
    });
	
 }

 //Reloads page
 function reloadPage() {
    location.reload();
}


