"use strict";

$(document).ready(function() {

  $(".search-bar").show();
  $("#output").hide();

  let weatherInfo = (searchedZipCode) => {
    return new Promise ((resolve,reject) => {
      $.ajax({
        method:"GET",
        url:`http://api.openweathermap.org/data/2.5/weather?zip=${searchedZipCode},us&units=imperial&APPID=349ecc5fc8a79b57d436f8da19c6af12`
      }).then((response)=>{
        resolve(response);
      });
    });
  };

  function enterKeyValidation(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      submitAJAX();
    }
  }

  function submitAJAX() {
    let searchedZipCode = $("#weather-search").val();
    if(validateUserZipCode(searchedZipCode)) {
      weatherInfo(searchedZipCode).then((returnedWeatherInfo)=>{
        console.log(returnedWeatherInfo);
        $("#myModal").modal('show');
        $("#myModalLabel").html("Temperature: " + Math.round(returnedWeatherInfo.main.temp));
        $("#myModalLabel").append("<br />Temperature: " + Math.round(returnedWeatherInfo.main.temp));
      });
    }
  }

  function validateUserZipCode(userInput) {
    if(userInput.length === 5 && $.isNumeric(userInput)) {
      return true;
    } else {
      displayWinnerModal("Invalid zip code");
      return false;
    }
  }

  function displayWinnerModal(message) {
    $("#myModal").modal('show');
    $("#myModalLabel").html(message);
  }

  $("#search-button").on("click",submitAJAX);
  $("#weather-search").on("keyup",enterKeyValidation);
});
