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
        //If any matches are found, the length will be greater than 0
      	if($("*#hidden-letter-" + $(this).attr("data-letter")).length !== 0){ 
          console.log($("*#hidden-letter-" + $(this).attr("data-letter")).length)
          //Change _ to matched data letter value
      		$("*#hidden-letter-" + $(this).attr("data-letter")).text($(this).attr("data-letter"));
          //Removes button from the DOM
          $(this).remove();

          //End game when last correct letter is chosen when there is no more _
        if($("#blank-word").children().text().indexOf("_ ") == -1){
          $("#buttons").remove();
          $("#title").text("You live"); //User wins
          $("#play").append("<br><button onclick='reloadPage()'>Play Again!</button>"); //Restart game
          }
          
      	}else{
          //Wrong guess
          //Decrement count and remove wrong choice and store it under wrong-letters
      		count -= 1;
	      	$("#wrong-letters").append($(this).attr("data-letter")); //FIXED!
          //Display countdown
          $("#count").text(count);
          //Check if user lost (count is 0) 
	        if(count==0){
            //Reveal answer

            $("#blank-word").replaceWith('<div class="answer">' + answer + '</div');
	        	$("#buttons").remove();
	        	$("#title").text("Life is short"); //Game over
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
    hiddenWord(answer);
}

//Creates the span element with the underscore for each letter of the hidden word
function hiddenWord (word) {
  //Split a string into an array of letters
	$.each(word.split(""), function (i, el) {
    //For each letter in the word, create a span with the atribute data-letter = letter and a text of "_ "
        $("#blank-word").append("<span id='hidden-letter-" + el + "'>_ </span");
    });
	
 }

 //Reloads page
 function reloadPage() {
    location.reload();
}


