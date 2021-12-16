

$("#showRegister").on("click",function () {
	$("#registerModal").css("display","block");
});

$("#showLogin").on("click",function () {
	$("#loginModal").css("display","block");
});

$(".close").on("click",function () {
	$("#registerModal").css("display","none");
	$("#loginModal").css("display","none");
});

$(".active").css("display", "block");	
function toggleCollapse() {
	$(".active").css("display", "block");	
  if ($(".topnav-links").css("display") === "block"){
		$(".topnav-links").css("display", "none");
  }
  else {
  	$(".topnav-links").css("display", "block");	
  }
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  if (slides.length != 0) {
    slides[slideIndex-1].style.display = "block";  
    dots[slideIndex-1].className += " active";
  }
}

$(document).ready(function () {
  function counter(id, start, end, duration) {
  let obj = document.getElementById(id),
   current = start,
   range = end - start,     
   increment = end > start ? 1 : -1,
   step = Math.abs(Math.floor(duration / range)),
   timer = setInterval(() => {
    current += increment;
    obj.textContent = current;
    if (current == end) {
     clearInterval(timer);
    }
   }, step);
 }
 if (document.location.href.match(/[^\/]+$/)[0] === 'achievements.html') {
   counter("count1", 0, 500, 3000);
   counter("count2", 100, 1000, 2500);
   counter("count3", 0, 200, 3000);
 }
});

var persons = new Array();

$(document).ready(function () {
  json = window.localStorage.getItem('users');
  if (json == null) {
    let admin = {
      email: "admin",
      pass: "admin"
    }
    persons[0] = admin;
    window.localStorage.setItem('users', JSON.stringify(persons))
  }
  else {
    persons = JSON.parse(json);
  }
});


$('button[name="signupbtn"]').on("click",function () {
  let email = $('input[name="email"]').val();
  for (var i = 0; i < persons.length; i++) {
    if(persons[i]['email'] == email){
      alert("Email already taken");
      return;
    }
  }
  let pass = $('input[name="pass"]').val();
  let pass2 = $('input[name="pass-repeat"]').val();
  if (pass != pass2) {
    alert("Passwords does not match");
  }
  else {
    let user = {
      email: email,
      pass: pass,
      active: false
    }
    persons[persons.length] = user;
    window.localStorage.setItem('users', JSON.stringify(persons));
  }
});

$('button[name="signinbtn"]').on("click",function () {
  let email = $('input[name="emaill"]').val();
  let pass = $('input[name="passl"]').val();
  for (var i = 0; i < persons.length; i++) {

    if(persons[i]['email'] == email){

      if (persons[i]['pass'] == pass) {

        if (email == 'admin') {

          window.localStorage.setItem('currentUser', email);
          window.location.href = 'admin.html';
          return;

        }

        if (persons[i]['active'] == false) {
          alert("Your account is not activated!");
          return;

        }

        window.localStorage.setItem('currentUser', email);
        location.reload();
        return;

      }

      else {

        alert("Incorrect password");
        return;

      }
    }
  }
  alert("Incorrect email");
});

$(document).ready(function () {
  if (window.localStorage.getItem('currentUser') != null) {
    $('.authorizeButton').hide();
    $('.userSection').show();
    $('.username').html(window.localStorage.getItem('currentUser'));
  }
  else {
    $('.userSection').hide();
    $('.authorizeButton').show();
  }
});

$('#logOut').on("click",function () {
  window.localStorage.removeItem('currentUser');
  location.reload();  
});

$('.logout').on("click",function () {
  window.localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
});

if (document.location.href.match(/[^\/]+$/)[0] === 'admin.html') {
  $(document).ready(function () {
    for (var i = 1; i < persons.length; i++) {
      let obj = ('<li class="users"><form><a href="#">User ' + i +'</a><p>Email: ' + persons[i]["email"]+ '</p><p>Active: ' + persons[i]["active"]+ '</p><button class="btn-red" value="' + persons[i]["email"]+ '" type="button"/>Disable</button><button class="btn-orange" value="' + persons[i]["email"]+ '" type="button"/>Enable</button><button class="btn-red" value="' + persons[i]["email"]+ '" type="button"/>Delete</button></form></li>');
      $("#users").append(obj);
    }
    $("button").on("click",function () {
      let type = $(this).html();
      let email = $(this).attr("value");

      if (type == 'Disable') {
        for (let i = 1; i < persons.length; i++) {
          if(persons[i]['email'] == email){
            persons[i]['active'] = false;
            break;
          }
        }
      }
      
      if (type == 'Enable') {
        for (let i = 1; i < persons.length; i++) {
          if(persons[i]['email'] == email){
            persons[i]['active'] = true;
            break;
          }
        } 
      }
      
      if (type == 'Delete') {
        for (let i = 1; i < persons.length; i++) {
          if(persons[i]['email'] == email){
            persons = persons.filter(function(value, index, arr){ 
                return value['email'] != email;
            });
            break;
          }
        } 
      }

    window.localStorage.setItem('users', JSON.stringify(persons));
    location.reload();

    });
  });
  
}