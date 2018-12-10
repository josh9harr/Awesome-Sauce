var data;
var request = new XMLHttpRequest();
var Home = document.getElementById('HomePage');
var Game = document.getElementById('GamePage');
var Answer = document.getElementById('QuestionPage');
var choices = [];
var score = 0;
var pointValue;
var correct;
var turn =0;
var highscore;
var printHighscore;

function endGame(){
    Answer.style.display = "none";
    Game.style.display = "block";
    alert("The game is finished! you have scored " + score + " points!");
    highscore = score;
    saveHighscore(score,"TriviaHighscore");
    if(highscore > document.cookie){
        document.cookie = "highscore="+score;
    }
    location.reload();
}

function saveHighscore(newscore,key){
    if(newscore>printHighscore || printHighscore===undefined){
        localStorage.setItem(key, newscore);
    }
    printHighscore = localStorage.getItem(key);
    console.log("The HighScore is "+printHighscore);
}

function loadData(api) {
    request.open('GET', api);
    request.onload = loadComplete;
    request.send();
}
    
function loadComplete(evt) {
  data = JSON.parse(request.responseText);
  var rand = Math.floor(Math.random()*10);

  array = [0,1,2,3];
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  
  document.getElementById('question').innerHTML= data.results[rand].question;

  choices.push(data.results[rand].correct_answer);
  choices.push(data.results[rand].incorrect_answers[2]);
  choices.push(data.results[rand].incorrect_answers[0]);
  choices.push(data.results[rand].incorrect_answers[1]); 

  document.getElementById("answer1").innerHTML = choices[array[0]];
  document.getElementById("answer2").innerHTML = choices[array[1]];
  document.getElementById("answer3").innerHTML = choices[array[2]];
  document.getElementById("answer4").innerHTML = choices[array[3]];

  console.log(data.results[rand].correct_answer);
  correct = data.results[rand].correct_answer;
}

function checkAnswer(id){
    console.log(document.getElementById("answer"+id).textContent);
    if(document.getElementById("answer"+id).textContent == correct){
        score = score+pointValue;
        document.getElementById('Score').innerHTML = "Score: " + score;
        document.getElementById('result').innerHTML = "Correct! You got "+pointValue+' points.'
    }else{
        document.getElementById('result').innerHTML = "Wrong! You did not recieve any points"
    }
    Answer.style.display = "none";
    Game.style.display = "block"

    choices=[];
    turn++;

    if(turn==15){
        endGame();
    }
}

function alreadyAsked(){
    console.log("You already got this question");
}

function validate(){
var error = false;
var error_msg="";
var playerName = document.forms["myForm"]['playerName'].value;
var name_patt = /[a-z]+/i; 

    if(!name_patt.test(playerName)){
        error=true;
        error_msg += "Not a valid name.<br/>"
    }
    
    if(error){
        document.getElementById('response').innerHTML = error_msg;
        return false;   
    }

    return false
}

function clickedCompEasy(value){
    api = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple';
    hideGame(value);
   var box= document.getElementById('comp'+value).style.backgroundColor = '#000';
   document.getElementById('comp'+value).onclick = alreadyAsked();

}
function clickedCompMedium(value){
    api = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple';
    hideGame(value);
    document.getElementById('comp'+value).style.backgroundColor = '#000';
}
function clickedCompHard(value){
    api = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=hard&type=multiple';
    hideGame(value);
    document.getElementById('comp'+value).style.backgroundColor = '#000';
}
function clickedVGEasy(value){
    api = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=easy&type=multiple';
    hideGame(value);
    document.getElementById('VG'+value).style.backgroundColor = '#000';
}
function clickedVGMedium(value){
    api = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=medium&type=multiple';
    hideGame(value);
    document.getElementById('VG'+value).style.backgroundColor = '#000';
}
function clickedVGHard(value){
    api = 'https://opentdb.com/api.php?amount=10&category=15&difficulty=hard&type=multiple';
    hideGame(value);
    document.getElementById('VG'+value).style.backgroundColor = '#000';
}
function clickedCartEasy(value){
    api = 'https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple';
    hideGame(value);
    document.getElementById('cart'+value).style.backgroundColor = '#000';
}
function clickedCartMedium(value){
    api = 'https://opentdb.com/api.php?amount=10&category=32&difficulty=medium&type=multiple';
    hideGame(value);
    document.getElementById('cart'+value).style.backgroundColor = '#000';
}
function clickedCartHard(value){
    api = 'https://opentdb.com/api.php?amount=10&category=32&difficulty=hard&type=multiple';
    hideGame(value);
    document.getElementById('cart'+value).style.backgroundColor = '#000';

}
function hideHome(){
    Home.style.display = "none"
    Game.style.display = "block"
}
function hideGame(value){
    Game.style.display = "none";
    Answer.style.display = "block";
    pointValue = value;

    loadData(api);
}