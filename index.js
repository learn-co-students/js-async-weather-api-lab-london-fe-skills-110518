const API_KEY = "b0ad7012e63564d7941bfbbeba65f56f"

function handleFormSubmit() {
  let city = document.getElementById('city').value;
  document.querySelector('aside').innerHTML = "";
  fetchCurrentWeather(city);
  fetchFiveDayForecast(city);
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  fetch(`https://api.openweathermap.org/data/2.5/weather?APPid=${API_KEY}&q=${city}`)
    .then(resp => resp.json())
    .then(json => displayCurrentWeather(json))
    
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
let currentKelvin = parseInt(json.main.temp,10);
let currentCelsius = currentKelvin - 273.15;
let currentTemp = currentCelsius.toFixed(1);
document.getElementById("temp").innerHTML = `${currentTemp}`;

let lowKelvin = parseInt(json.main.temp_min,10);
let lowCelsius = lowKelvin - 273.15;
let lowTemp = lowCelsius.toFixed(1);
document.getElementById("low").innerHTML = `${lowTemp}`;

let highKelvin = parseInt(json.main.temp_max,10);
let highCelsius = highKelvin - 273.15;
let highTemp = highCelsius.toFixed(1);
document.getElementById("high").innerHTML = `${highTemp}`;

document.getElementById("humidity").innerHTML = `${json.main.humidity}`;

document.getElementById("cloudCover").innerHTML = `${json.clouds.all}`;
}


function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  fetch(`https://api.openweathermap.org/data/2.5/forecast?APPid=${API_KEY}&q=${city}`)
  .then(resp => resp.json())
  .then(json => displayFiveDayForecast(json));
    
}


function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
const main = document.querySelector('aside')
   for (let slot of json.list) {
   const h2 = document.createElement('div')
    h2.innerHTML = `<p> ${slot.dt_txt}</p> <p>${slot.main.temp}</p> <p>${slot.main.humidity}</p>`
    main.appendChild(h2);
   }
   createChart(json)
}

function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
   let times = [];
   let temp = [];
   for (let slot of json.list) {
    times.push(slot.dt_txt);
    temp.push(slot.main.temp);
    
}
var ctx = document.getElementById("WeatherChart");
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: times,
        datasets: [{
            label: 'Temperature',
            data: temp,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:false
                }
            }]
        }
    }
});
}

// }

//document.addEventListener('DOMContentLoaded', function() {
//document.getElementById(cityForm).addEventListener("submit", handleFormSubmit(event) )
  
//})
