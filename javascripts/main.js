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

  let weatherForecast = (url) => {
    return new Promise ((resolve,reject) => {
      $.ajax({
        method:"GET",
        url:`${url}`
      }).then((response)=>{
        resolve(response);
      });
    });
  };

  function enterKeyValidation(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
      returnZipCodeWeather();
    }
  }

  function returnZipCodeWeather() {
    let searchedZipCode = $("#weather-search").val();
    let multiDayAjaxUrl = "";
    $("#weather-search").val("");
    if(validateUserZipCode(searchedZipCode)) {
      weatherInfo(searchedZipCode).then((returnedWeatherInfo)=>{
        console.log(returnedWeatherInfo);
        let cityName = returnedWeatherInfo.name;
        $("#myModal").modal('show');
        $("#myModalLabel").html("Searched Zip Code: " + searchedZipCode);
        $("#myModalLabel").append("<br />Temperature: " + Math.round(returnedWeatherInfo.main.temp) + " degrees fahrenheit");
        $("#myModalLabel").append(`<br />Conditions: ${returnedWeatherInfo.weather[0].description}`);
        $("#myModalLabel").append(`<br />Air Pressure: ${returnedWeatherInfo.main.pressure} mbar`);
        $("#myModalLabel").append(`<br />Wind Speed: ${returnedWeatherInfo.wind.speed} mph`);
        $("#myModalLabel").append(`<br /><div id="btn_container"><button type="button" id="3_day_btn" class="btn btn-secondary">3 day forecast</button><button type="button" id="7_day_btn" class="btn btn-secondary">7 day forecast</button></div>`);
        $("#3_day_btn").addClass("centered");
        $("#3_day_btn").on("click",function() {
          multiDayAjaxUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=3&APPID=349ecc5fc8a79b57d436f8da19c6af12`;
          console.log("multiDayAjaxUrl: ",multiDayAjaxUrl);
          displayRequestedForecast(multiDayAjaxUrl);
        });
        $("#7_day_btn").addClass("centered");
        $("#7_day_btn").on("click",function() {
          multiDayAjaxUrl = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${cityName}&cnt=7&APPID=349ecc5fc8a79b57d436f8da19c6af12`;
          console.log("multiDayAjaxUrl: ",multiDayAjaxUrl);
          displayRequestedForecast(multiDayAjaxUrl);
        });
      });
    }
  }

  function displayRequestedForecast(url) {
    weatherForecast(url).then((returnedWeatherInfo)=>{
      console.log(returnedWeatherInfo);
      let forecastArray = returnedWeatherInfo.list;
      console.log("forecastArray: ",forecastArray);
      // returnedWeatherInfo.list.forEach(function())
      // $("#myModalLabel").append();
    });
  }

  function validateUserZipCode(userInput) {
    if(userInput.length === 5 && $.isNumeric(userInput)) {
      return true;
    } else {
      displayModal("Invalid zip code");
      return false;
    }
  }

  function displayModal(message) {
    $("#myModal").modal('show');
    $("#myModalLabel").html(message);
  }

  $("#search-button").on("click",returnZipCodeWeather);
  $("#weather-search").on("keyup",enterKeyValidation);
});
