/*jslint devel: false*/
//'use strict';

var weatherConditions = new XMLHttpRequest();

var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;


function loadWeather() { 
    var zip=document.getElementById('zip').value;
    if (zip=== '') {zip = "78412"};
    //loading inputvalue into function
    var conditionspath = "http://api.wunderground.com/api/bb02cd5fb891fe03/conditions/q/"+zip+".json";
    var forecastpath = "http://api.wunderground.com/api/bb02cd5fb891fe03/forecast/q/"+zip+".json";
    
    
    
    // GET THE CONDITIONS
    
weatherConditions.open('GET', conditionspath, true);
weatherConditions.responseType = 'text';
weatherConditions.send(null);

    
    // GET THE FORECARST
weatherForecast.open('GET', forecastpath, true);
weatherForecast.responseType = 'text'; 
weatherForecast.send();

}




weatherConditions.onload = function () { 
    'use strict';
    if (weatherConditions.status === 200) {
        cObj = JSON.parse(weatherConditions.responseText);  
        console.log(cObj);
        document.getElementById('location').innerHTML = cObj.current_observation.display_location.full;
        document.getElementById('weather').innerHTML = cObj.current_observation.weather;
        document.getElementById('temperature').innerHTML = cObj.current_observation.temp_f;
        
    } //end if
}; //end function






weatherForecast.onload = function () {
    'use strict';
    if (weatherForecast.status === 200) {
        fObj = JSON.parse(weatherForecast.responseText);
        console.log(fObj);
	document.getElementById('desc').innerHTML = fObj.forecast.txt_forecast.forecastday["0"].fcttext;
        //For nextDay
        document.getElementById('r1c1').innerHTML = fObj.forecast.simpleforecast.forecastday[1].date.weekday;
        document.getElementById('r1c3').innerHTML = fObj.forecast.simpleforecast.forecastday[1].high.fahrenheit+"°";
        document.getElementById('r1c4').innerHTML = fObj.forecast.simpleforecast.forecastday[1].low.fahrenheit+"°";
        var imagepath = fObj.forecast.simpleforecast.forecastday[1].icon_url;
        document.getElementById('r1c2').src = imagepath; 
        
        //For consecutive day 2
        
        document.getElementById('r2c1').innerHTML = fObj.forecast.simpleforecast.forecastday[2].date.weekday;
        document.getElementById('r2c3').innerHTML = fObj.forecast.simpleforecast.forecastday[2].high.fahrenheit+"°";
        document.getElementById('r2c4').innerHTML = fObj.forecast.simpleforecast.forecastday[2].low.fahrenheit+"°";
        var imagepath = fObj.forecast.simpleforecast.forecastday[2].icon_url;
        document.getElementById('r2c2').src = imagepath; 
        
        //For consecutive day 3
        
        document.getElementById('r3c1').innerHTML = fObj.forecast.simpleforecast.forecastday[3].date.weekday;
        document.getElementById('r3c3').innerHTML = fObj.forecast.simpleforecast.forecastday[3].high.fahrenheit+"°";
        document.getElementById('r3c4').innerHTML = fObj.forecast.simpleforecast.forecastday[3].low.fahrenheit+"°";
        var imagepath = fObj.forecast.simpleforecast.forecastday[3].icon_url;
        document.getElementById('r3c2').src = imagepath; 
    } //end if
}; //end function

function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 8,
          center: {lat: -34.397, lng: 150.644}
        });
        var geocoder = new google.maps.Geocoder();

        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder, map);
        });
      }

      function geocodeAddress(geocoder, resultsMap) {
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      }
