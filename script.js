const apiKey = '1f0607fa86a77f9c89257262c4b721c6';
const city = 'Moscow,ru'; // должен меняться
const forecast=document.querySelector(".forecast")
// закат и рассвет data.city.sunset
// data.list[0].weather[0].description - описание погоды


fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`)
.then(response=>response.json())
.then(data=>{
    console.log(data);

    document.querySelector(".current__temperature").innerHTML = Math.round(data.list[0].main.temp-273)+'&deg';
    console.log(data.list[0].main.feels_like);
    document.querySelector(".current__description").innerHTML = data.list[0].weather[0].description;
    document.querySelector(".current__city").innerHTML = data.city.name;


    for(let i=0; i<6; i++){
        let date=(data.list[i].dt_txt).slice(10,16);
        let icon=data.list[i].weather[0].icon;
        let temp=Math.round(data.list[i].main.temp-273)+'&deg';
        
        forecast.innerHTML+=`<div class="forecast__item">
        <div class="forecast__time">${date}</div>
        <div class="forecast__icon">${icon}</div>
        <div class="forecast__temperature">${temp}</div>
        </div>`
    }


    const renderDetails=(data)=>{
        let pressure=(data.list[0].main.pressure*0.75).toFixed()+' мм';
        let humidity=data.list[0].main.humidity+' %';
        let feelsLike=Math.round(data.list[0].main.feels_like-273)+'&deg'
        let wind=data.list[0].wind.speed +' м/с';
        renderDetailsItem('feelsLike',feelsLike);
        renderDetailsItem('pressure',pressure);
        renderDetailsItem('humidity',humidity);
        renderDetailsItem('wind',wind);
    }
    const renderDetailsItem=(className, value)=>{
        let container=document.querySelector(`.${className}`).querySelector('.details_item_value');
        container.innerHTML=value;
    }
    
    renderDetails(data)

})





//функция-прототип, добавляющая 0 в начале (для отображения времени)
//переводит число в строку
// Number.prototype.pad = function(size){
//     var s = String(this);
//     while (s.length < (size || 2)){s = "0" + s;}
//     return s;
// }
// function getHours(dateTime){
//     let date = new Date(dateTime);
//     let hours = date.getHours().pad();
//     return hours;
// }