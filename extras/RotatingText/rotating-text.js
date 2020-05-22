// Rotating Text credit to alphardex
var words = document.querySelectorAll(".word");
words.forEach(function(word) {
  var letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach(function(letter) {
    var span = document.createElement("span");
	if(word.color) span.style.setProperty("color", word.color);
    if (letter == " ") {
      span.textContent = " ";
      span.className = "letter";
      word.append(span);
    } else {
      span.textContent = letter;
      span.className = "letter";
      word.append(span);
    }
  });
});
var currentWordIndex = 0;
var maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";
var rotateText = function() {
  var currentWord = words[currentWordIndex];
  var nextWord = currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];
  // rotate out letters of current word
  Array.from(currentWord.children).forEach(function(letter, i) {
    setTimeout(function() {
      letter.className = "letter out";
    }, i * 40);
  });
  // reveal and rotate in letters of next word
  nextWord.style.opacity = "1";
  Array.from(nextWord.children).forEach(function(letter, i) {
    letter.className = "letter behind";
    setTimeout(function() {
      letter.className = "letter in";
    }, 500 + i * 20);
  });
  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};
setTimeout(rotateText, 1000);
setInterval(rotateText, 3000);