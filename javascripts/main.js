"use strict";

$(".search-bar").show();
$("#output").hide();

let weatherInfo = (searchedZipCode) => {
  return new Promise ((resolve,reject) => {
    $.ajax({
      method:"GET",
      url:`http://api.openweathermap.org/data/2.5/weather?zip=${searchedZipCode},us&APPID=349ecc5fc8a79b57d436f8da19c6af12`
    }).then((response)=>{
      resolve(response);
    });
  });
};

$(document).ready(function() {
  console.log("document ready");
  $("#search-button").on("click",()=>{
    let searchedZipCode = $("#weather-search").val();
    console.log("searched zip code: ",searchedZipCode);
    weatherInfo(searchedZipCode).then((returnedWeatherInfo)=>{
      console.log(returnedWeatherInfo);
    });
  });
});
