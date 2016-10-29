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
    $("#weather-search").val("");
    if(validateUserZipCode(searchedZipCode)) {
      weatherInfo(searchedZipCode).then((returnedWeatherInfo)=>{
        console.log(returnedWeatherInfo);
        $("#myModal").modal('show');
        $("#myModalLabel").html("Searched Zip Code: " + searchedZipCode);
        $("#myModalLabel").append("<br />Temperature: " + Math.round(returnedWeatherInfo.main.temp) + " degrees fahrenheit");
        $("#myModalLabel").append(`<br />Conditions: ${returnedWeatherInfo.weather[0].description}`);
        $("#myModalLabel").append(`<br />Pressure: ${returnedWeatherInfo.main.pressure} mbar`);
        $("#myModalLabel").append(`<br />Wind Speed: ${returnedWeatherInfo.wind.speed} mph`);
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
