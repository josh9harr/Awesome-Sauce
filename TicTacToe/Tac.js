var TURN = 0;
var GAMECOUNTER=0;

document.getElementById("box1").innerHTML = " ";
document.getElementById("box2").innerHTML = " ";
document.getElementById("box3").innerHTML = " ";
document.getElementById("box4").innerHTML = " ";
document.getElementById("box5").innerHTML = " ";
document.getElementById("box6").innerHTML = " ";
document.getElementById("box7").innerHTML = " ";
document.getElementById("box8").innerHTML = " ";
document.getElementById("box9").innerHTML = " ";
function Boxes(){

  var box1 = document.getElementById("box1").innerHTML;
  var box2 = document.getElementById("box2").innerHTML;
  var box3 =document.getElementById("box3").innerHTML;
  var box4 =document.getElementById("box4").innerHTML;
  var box5 =document.getElementById("box5").innerHTML;
  var box6 =document.getElementById("box6").innerHTML;
  var box7 =document.getElementById("box7").innerHTML;
  var box8 =document.getElementById("box8").innerHTML;
  var box9 =document.getElementById("box9").innerHTML;
  
}
document.querySelectorAll("#Tic td").forEach(e =>
  e.addEventListener("click", function(evt) {
    if(TURN==1){
      Player2(evt);
    }else{
      Player1(evt);
    }
  }))
  
  function Player1(evt){
    
    var id = evt.target.id;
    document.getElementById(id).innerHTML = "X";
    TURN=1;
    WinForPlayer1();
    GAMECOUNTER+=1;
    if(GAMECOUNTER==9){
      Draw();
    }
    }

    function Player2(evt){
    var id = evt.target.id;
    document.getElementById(id).innerHTML = "O";
      TURN=0;
      WinForPlayer2();
      GAMECOUNTER+=1;
      if(GAMECOUNTER==9){
        Draw();
      }
    }

    function WinForPlayer1(){
      Boxes();
      //#region Horizontal
      if(box1.innerHTML == "X"&&box2.innerHTML == "X"&&box3.innerHTML=="X"){
        alert("Player 1 wins!")
        NewGame();
      }
      if(box4.innerHTML == "X"&&box5.innerHTML == "X"&&box6.innerHTML=="X"){
        alert("Player 1 wins!")
        NewGame();
      }
      if(box7.innerHTML == "X"&&box8.innerHTML == "X"&&box9.innerHTML=="X"){
        alert("Player 1 wins!")
        NewGame();
      }
      //#endregion
      //#region Vertical
      if(box1.innerHTML == "X"&&box4.innerHTML == "X"&&box7.innerHTML=="X"){
        alert("Player 1 wins!")
        NewGame();
      }
      if(box2.innerHTML == "X"&&box5.innerHTML == "X"&&box8.innerHTML=="X"){
        alert("Player 1 wins!")
        NewGame();
      }
      if(box3.innerHTML == "X"&&box6.innerHTML == "X"&&box9.innerHTML=="X"){
        alert("Player 1 wins!")
        NewGame();
      }
      //#endregion
      //#region Diagonal
      if(box1.innerHTML == "X"&&box5.innerHTML == "X"&&box9.innerHTML=="X"){
        alert("Player 1 wins!")
        NewGame();
      }
      if(box3.innerHTML == "X"&&box5.innerHTML == "X"&&box7.innerHTML=="X"){
        alert("Player 1 wins!")
        NewGame();
      }
      //#endregion
    }
    function WinForPlayer2(){
      Boxes();
      //#region Horizontal
      if(box1.innerHTML == "O"&&box2.innerHTML == "O"&&box3.innerHTML=="O"){
        alert("Player 2 wins!")
        NewGame();
      }
      if(box4.innerHTML == "O"&&box5.innerHTML == "O"&&box6.innerHTML=="O"){
        alert("Player 2 wins!")
        NewGame();
      }
      if(box7.innerHTML == "O"&&box8.innerHTML == "O"&&box9.innerHTML=="O"){
        alert("Player 2 wins!")
        NewGame();
      }
      //#endregion
      //#region Vertical
      if(box1.innerHTML == "O"&&box4.innerHTML == "O"&&box7.innerHTML=="O"){
        alert("Player 2 wins!")
        NewGame();
      }
      if(box2.innerHTML == "O"&&box5.innerHTML == "O"&&box8.innerHTML=="O"){
        alert("Player 2 wins!")
        NewGame();
      }
      if(box3.innerHTML == "O"&&box6.innerHTML == "O"&&box9.innerHTML=="O"){
        alert("Player 2 wins!")
        NewGame();
      }
      //#endregion
      //#region Diagonal
      if(box1.innerHTML == "O"&&box5.innerHTML == "O"&&box9.innerHTML=="O"){
        alert("Player 2 wins!")
        NewGame();
      }
      if(box3.innerHTML == "O"&&box5.innerHTML == "O"&&box7.innerHTML=="O"){
        alert("Player 2 wins!")
        NewGame();
      }
      //#endregion
    }
    function Draw(){
      alert("Draw");
      NewGame();
    }
    function NewGame(){
       TURN = 0;
       GAMECOUNTER=0;
      document.getElementById("box1").innerHTML = " ";
document.getElementById("box2").innerHTML = " ";
document.getElementById("box3").innerHTML = " ";
document.getElementById("box4").innerHTML = " ";
document.getElementById("box5").innerHTML = " ";
document.getElementById("box6").innerHTML = " ";
document.getElementById("box7").innerHTML = " ";
document.getElementById("box8").innerHTML = " ";
document.getElementById("box9").innerHTML = " ";
    }