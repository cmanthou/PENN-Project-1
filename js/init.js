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
  }).then(function (response) {
    console.log(response);
  });
});
