const apiKey = '1f0607fa86a77f9c89257262c4b721c6';
// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key};

fetch(`http://api.openweathermap.org/data/2.5/forecast?q=London,us&appid=${apiKey}`)
.then(response=>response.json())
.then(data=>{
    console.log(data)
})