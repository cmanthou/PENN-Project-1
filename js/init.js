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
  event.preventDefault;
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
    results(response);
  });
});

function appendIfExists(startString, appendString) {
  return appendString ? startString + " " + appendString : startString;
}

function results(response) {
  $("#cityList").html("");
  var orgs = response.organizations;
  for (var org of orgs) {
    var a = $("<a>");
    console.log(org);
    a.attr("cityId", org.id);
    a.attr("href", org.website || org.url);
    a.attr("target", "_blank");
    a.text(org.name);
    var div = $("<div>");
    var address = org.address;
    var addressString = [
      org.email,
      address.address1,
      address.address2,
      address.city,
      ",",
      address.state,
      address.postcode,
    ].reduce(appendIfExists, "");
    div.text(addressString);
    var button = $("");
    button.click(function(){
      // console.log("button Click" );
      var start =  $("#cityInput").val();
      var origin = $("#mapbox-directions-origin-input > div > input")[0];
      var destination = $("#mapbox-directions-destination-input > div > input")[0];
      var driveBtn = $("#mapbox-directions-profile-driving");
      // origin.value = start;
      destination.value = address.city + ", " +  address.state + " " + address.postcode + " United States";
      driveBtn.click();

    })
    div.append(button);
    $("#cityList").append(a);
    $("#cityList").append(div);
  }
}
$("#submit").on("click", function (event) {
  event.preventDefault();
  alert("Thank you for your information");
  $("#first_name").val("");
  $("#last_name").val("");
  $("#email").val("");
});
