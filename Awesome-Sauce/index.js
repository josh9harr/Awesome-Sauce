var out = document.getElementById("logout");
var forms = document.getElementById('forms');
var welcome = document.getElementById('welcome');
var user = document.getElementById('user');
//function load(){
    out.style.display = 'none';
//}

function change(){
forms.style.display = 'none';
out.style.display = 'block';
welcome.style.display = 'block';
welcome.innerHTML = "Welcome " + user.value+",<br>Pick a Game to play"
}

function logout(){
    forms.style.display = 'block';
    out.style.display = 'none';
    welcome.style.display = 'none';
}