var rand = Math.floor(Math.random()*1000);
var nextNum = Math.floor(Math.random()*1000);
var score =0;
var printHighscore;
document.getElementById("numBox").innerHTML = rand;

function next(){
    document.getElementById('score').innerHTML = "Score: "+score;
    rand=nextNum;
    document.getElementById("numBox").innerHTML = rand;
    nextNum = Math.floor(Math.random()*1000);
    saveHighscore(score,'HiLowHighscore');
    
}

function saveHighscore(newscore,key){
    printHighscore = localStorage.getItem(key);
    if(newscore>printHighscore){
        localStorage.setItem(key, newscore);
    }
    console.log("The HighScore is "+printHighscore);
    document.getElementById('high').innerHTML = 'Highscore: ' + printHighscore;
}

function lower(){
    console.log("Clicked lower");
//    console.log("rand: " + rand);
//    console.log("nextNum: " + nextNum);
    if(nextNum<rand){
        document.getElementById('numBox').style.backgroundColor = '#09B029';
        score++;
    }else{
        document.getElementById('numBox').style.backgroundColor = '#B00D00';
        score = 0;
    }
next();

}

function higher(){
    console.log("Clicked Higher");
//    console.log("rand: " + rand);
//    console.log("nextNum: " + nextNum);
    document.getElementById("numBox").innerHTML = nextNum;
    if(nextNum>rand){
        document.getElementById('numBox').style.backgroundColor = '#09B029';
        score++;
    }else{
        document.getElementById('numBox').style.backgroundColor = '#B00D00';
        score = 0;
    }
next();
}
