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

