var canvas = document.getElementById('maze');
var ctx = canvas.getContext('2d');

var grid = [];
var visited = [];
var traceback = [];
var nodesArray = [];
var possible = [];
var toTheEnd = [];
var startNode;
var endPoint;
var current;
var direction;
var posLength;
var MAZE_WIDTH = 25;
var MAZE_HEIGHT = 25;
var BLOCK_SIZE = 20;
var farthest = 0;
var KEYCODE_LEFT = 37;
var KEYCODE_UP = 38;
var KEYCODE_RIGHT = 39;
var KEYCODE_DOWN = 40;
var boxX;
var boxY;
var stepper = 1;
var currentStop = 0;
var upKey = false;
var downKey = false;
var leftKey = false;
var rightKey = false;
var playerX;
var playerY;
var score = 60;
var printHighscore;



function drawSquare(x,y,r,g,b) {
    ctx.fillStyle = 'rgb('+r+','+g+','+b+')';
    ctx.fillRect(x,y,BLOCK_SIZE, BLOCK_SIZE);
}
function Location(x, y){
    this.x=x;
    this.y = y;
}

function Player(x,y){
    this.x = x;
    this.y = y;
}

function makeGrid(){

    for(var i = 0; i<MAZE_WIDTH; i++){
        grid[i] = [];
        for(var j=0; j<MAZE_HEIGHT; j++){
            grid[i][j]=1;
        }
    }
}
function drawMaze(){
    for(var y=0;y<MAZE_HEIGHT; y++){
        for(var x=0;x<MAZE_WIDTH;x++){
            if(grid[x][y] == 1){
                drawSquare(x*BLOCK_SIZE, y*BLOCK_SIZE,y*7,x*10,155);
            }
            if (grid[x][y] == 2) {
                drawSquare(x * BLOCK_SIZE, y * BLOCK_SIZE, 255, 255, 255);
            }
        }
    }
}
function setNodes(){
    for(var y=0;y<MAZE_HEIGHT; y++){
        for(var x=0;x<MAZE_WIDTH;x++){
            if(x%2 != 0 && y%2 != 0){
                nodesArray.push({x,y});
                grid[x][y]=0;
            }
        }
    }
}

function startNode(){
   var begin = Math.floor(Math.random()*nodesArray.length);
   var startNode = nodesArray[begin];
   visited.push(startNode);
   traceback.push(startNode);
   grid[startNode.x][startNode.y] = 2;
   drawSquare(startNode.x*BLOCK_SIZE,startNode.y*BLOCK_SIZE,255,255,0);
   playerX = startNode.x;
   playerY = startNode.y;
}
function nextNode(){

    possible = [];
    current = traceback[traceback.length-1];

//down
    if(current.y+2 <MAZE_HEIGHT){
       possible.push({x:current.x,y:current.y+2});
    }
//up
    if(current.y-2 >=1){
        possible.push({x:current.x,y:current.y-2});
    }
//left
    if(current.x-2 >=1){
        possible.push({x:current.x-2,y:current.y});
    }
//right
    if(current.x+2 <MAZE_WIDTH){
        possible.push({x:current.x+2,y:current.y});
    }   
}

function checkVisited(){

    for(var d=0;d<visited.length; d++){
        for(var q=possible.length-1;q!=-1;q--){
            if(visited[d].x ==possible[q].x && visited[d].y == possible[q].y){
                possible.splice(q,1);
            }
            
        }
        
    }

    if(traceback.length>farthest){
        farthest=traceback.length;
        endPoint = {x:traceback[traceback.length-1].x,y:traceback[traceback.length-1].y};
        toTheEnd = JSON.parse(JSON.stringify(traceback));
        boxX=toTheEnd[currentStop].x*BLOCK_SIZE;
        boxY=toTheEnd[currentStop].y*BLOCK_SIZE;
    }
        
    if(possible.length!=0){
        
        var a = Math.floor(Math.random()*possible.length);
        direction = possible[a];
        connectNodes(traceback[traceback.length-1],direction);
            visited.push(direction);
            traceback.push(direction);
            
       //     drawSquare(direction.x*BLOCK_SIZE,direction.y*BLOCK_SIZE,0,0,0); 
            grid[direction.x][direction.y]=0;
        
            if(visited.length==nodesArray.length){
            drawSquare(endPoint.x*BLOCK_SIZE,endPoint.y*BLOCK_SIZE,255,0,0); 
            grid[endPoint.x][endPoint.y]=4;
            }
    }else{
        traceback.pop()            
    }  

}
function connectNodes(newNode,oldNode){
  var newX = (newNode.x-(newNode.x-oldNode.x)/2);
  var newY = (newNode.y-(newNode.y-oldNode.y)/2);
    drawSquare(newX*BLOCK_SIZE,newY*BLOCK_SIZE,0,0,0);
    grid[newX][newY]=0;

}
function loop() {
    colorChange();
//    console.log(playerX +" , "+playerY );
    if (leftKey == true && grid[playerX - 1][playerY] != 1) {
        grid[playerX][playerY]  = 0;
        grid[playerX-1][playerY] = 3;
        playerX -= 1;
    }
    if (rightKey == true && grid[playerX + 1][playerY] != 1) {
        grid[playerX][playerY]  = 0;
        grid[playerX+1][playerY] = 3;
        playerX += 1;
    }
    if (upKey == true && grid[playerX][playerY - 1] != 1) {
        grid[playerX][playerY]  = 0;
        grid[playerX][playerY-1] = 3;
        playerY -= 1;
    }
    if (downKey == true && grid[playerX][playerY + 1] != 1) {
        grid[playerX][playerY]  = 0;
        grid[playerX][playerY+1] = 3;
        playerY += 1;
    }
    colorChange();

    if(grid[playerX][playerY] == grid[endPoint.x][endPoint.y] && time!=0){
        clearInterval(interval);
        clearInterval(tick);
        document.getElementById("win").style.display = "block";
        score = 60-time;
        document.getElementById('timer').innerHTML="Timer: "+time + "    Congrats! You completed the maze in " + score + " seconds!";
        saveHighscore(score, 'MazeHighscore');

    };
    if(time==0){
        clearInterval(interval);
        clearInterval(tick);
        document.getElementById("lose").style.display = "block";
    }

}

function saveHighscore(newscore,key){
    if(newscore<printHighscore){
        localStorage.setItem(key, newscore);
    }
    printHighscore = localStorage.getItem(key);
    console.log("The HighScore is "+printHighscore);
//    document.getElementById('high').innerHTML = 'Highscore: ' + printHighscore;
}

function handleKeyDown(evt) {
    if (!evt) { var evt = window.event; }  //browser compatibility
    switch (evt.keyCode) {
        case KEYCODE_LEFT:
            leftKey = true;
            return false;
        case KEYCODE_RIGHT:
            rightKey = true;
            return false;
        case KEYCODE_UP:
            upKey = true;
            return false;
        case KEYCODE_DOWN:
            downKey = true;
            return false;
    }
}
function handleKeyUp(evt) {
    if (!evt) { var evt = window.event; }  //browser compatibility
    switch (evt.keyCode) {
        case KEYCODE_LEFT:
            leftKey = false;
            break;
        case KEYCODE_RIGHT:
            rightKey = false;
            break;
        case KEYCODE_UP:
            upKey = false;
            break;
        case KEYCODE_DOWN:
            downKey = false;
            break;
    }
}
function colorChange(){
    for (var i = 0; i < MAZE_WIDTH; i++) {
        for (var j = 0; j < MAZE_HEIGHT; j++) {
            if(grid[i][j] == 0){
                drawSquare(i * BLOCK_SIZE, j * BLOCK_SIZE, 0, 0, 0);
            }
            if(grid[i][j] ==32){
                drawSquare(i * BLOCK_SIZE, j * BLOCK_SIZE, 255, 255, 0);
            }
            if(grid[i][j] ==3){
                drawSquare(i * BLOCK_SIZE, j * BLOCK_SIZE, 255, 255, 255);
            }
            if(grid[i][j] == 4){
                drawSquare(i * BLOCK_SIZE, j * BLOCK_SIZE, 255, 0, 0);
            }
        }
    }
}
function ticker(){
    time--;
    document.getElementById('timer').innerHTML="Timer: "+time;
}

makeGrid();
setNodes();
startNode();
drawMaze();
do {
    nextNode();
    checkVisited();
} while (visited.length != nodesArray.length);
var time = 61;
var tick = setInterval(ticker,1000);
var interval = setInterval(loop, 100);
 document.onkeydown = handleKeyDown;
 document.onkeyup = handleKeyUp;

