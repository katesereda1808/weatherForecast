'use strict';
const apiKey = '1f0607fa86a77f9c89257262c4b721c6';
const forecast = document.querySelector(".forecast");
let GeoObj = {};
const renderDetails=(data)=>{
    let pressure=(data.list[0].main.pressure*0.75).toFixed()+' mm';
    let humidity=data.list[0].main.humidity+' %';
    let feelsLike=Math.round(data.list[0].main.feels_like-273)+'&deg'
    let wind=data.list[0].wind.speed +' m/s';
    renderDetailsItem('feelsLike',feelsLike);
    renderDetailsItem('pressure',pressure);
    renderDetailsItem('humidity',humidity);
    renderDetailsItem('wind',wind);
}
const renderDetailsItem=(className, value)=>{
    let container=document.querySelector(`.${className}`).querySelector('.details_item_value');
    container.innerHTML=value;
}
const isDay=(data)=>{
    let sunrise=data.city.sunrise*1000;
    let sunset=data.city.sunset*1000;
    let now=Date.now();
    return(now>sunrise&&now<sunset);
}
const renderDayNightTheme=(data)=>{
    let attrName=isDay(data)?'day':'night';
    document.documentElement.setAttribute('data-theme', attrName)
}

function renderForecast(data){
    console.log(data);
    document.querySelector('.current__icon').classList.add(`icon__${data.list[0].weather[0].icon}`)
    document.querySelector(".current__temperature").innerHTML = Math.round(data.list[0].main.temp-273)+'&deg';
    document.querySelector(".current__description").innerHTML = data.list[0].weather[0].description;
    document.querySelector(".current__city").innerHTML = data.city.name;
    for(let i=0; i<6; i++){
        let date=(i==0? 'Now': data.list[i].dt_txt.slice(10,16));
        let icon=data.list[i].weather[0].icon;
        let temp=Math.round(data.list[i].main.temp-273)+'&deg';
        forecast.innerHTML+=`<div class="forecast__item">
        <div class="forecast__time">${date}</div>
        <div class="forecast__icon icon__${icon}"></div>
        <div class="forecast__temperature">${temp}</div>
        </div>`
    }
}

function getLocation(){
    return new Promise((resolve, reject)=>{
        navigator.geolocation.getCurrentPosition(function(position){
            if(position){
                GeoObj.latitude = position.coords.latitude;
                GeoObj.longitude = position.coords.longitude;
                resolve(GeoObj);
            } else {
                reject(error)
            }
        })
    })
}

function getForecast(coordinates){
    fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&appid=${apiKey}`)
    .then((response) => {
        return response.json();
      })
    .then((data) => {
        console.log(data);
        renderForecast(data);
        renderDetails(data);
        renderDayNightTheme(data);
      })
    .catch((err)=>{
        console.log(err)
    })
}

getLocation()
.then((geoPosition)=>
        {
        getForecast(geoPosition);
    })
    






