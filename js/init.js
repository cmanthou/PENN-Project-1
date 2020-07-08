(function ($) {
  $(function () {
    $(".sidenav").sidenav();
    $(".parallax").parallax();
  }); // end of document ready
})(jQuery); // end of jQuery name space
var token;
var queryURL =
  "https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/oauth2/token";
$.ajax({
  url: queryURL,
  method: "POST",
  data: {
    grant_type: "client_credentials",
    client_id: "jwiHAizfWoRDRFwMQBD46rrrt7RaSXvNMjMDfgDuae8O7eFIEj",
    client_secret: "ME14Jzyaaa4mwLFclDqoVZuw1GFPexThK5Y7zVVs",
  },
}).then(function (response) {
  console.log(response);
  token = response.access_token;
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".carousel");
  var options = [];
  var instances = M.Carousel.init(elems, options);
});

// Or with jQuery

$(document).ready(function () {
  $(".carousel").carousel();
});

var queryURL = `https://cors-anywhere.herokuapp.com/https://api.petfinder.com/v2/organizations`;

$(".btn").on("click", function (event) {
  event.preventDefault();
  console.log("btn click");

  $.ajax({
    url: queryURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    data: {
      location: $("#cityInput").val(),      
    },
  }).then(function (response) {
    console.log(response);
    var el = $("<div>");
    el.text(JSON.stringify(response));
    $("#cityList").append(el);
  });
});

$(window).on('load', function () {
  currentLocation();
});

// API Key for current date /time  
var APIKey = "09e0d7e534e41ce68ba5f2577fa5f760";
var q = "";

//Function to get weather details 
function getWeather(q) {
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + q + "&units=imperial&appid=" + APIKey;
  $.ajax({
    // gets the current weather info
    url: queryURL,
    method: "GET",

  }).then(function (response) {
    console.log(response)    
    $(".clock").append($("<h5> Current Location : " + response.name + "</h5>"));   
  });
}

// Display Current Locaion 
function currentLocation() {
  $.ajax({
    url: "https://freegeoip.app/json/",
    method: "GET",
  }).then(function (response) {
    q = response.city || 'philadelphia';
    console.log(q);
    getWeather(q);
  });
};
