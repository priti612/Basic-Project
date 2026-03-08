const searchbox=document.querySelector(".search input");
const buttbox=document.querySelector(".button input");
const weathericon=document.querySelector(".weather-icon")
const apikey="78f80b305677c894da157ca4eb4c5bc0";
const apiurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkweather(city) {
    const response=await fetch(apiurl+city +`&appid=${apikey}`);
    var data=await response.json();
   
    document.querySelector('.city').innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°c";
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    document.querySelector(".wind").innerHTML=data.wind.speed+"km/h";

if(data.weather[0].main=="Clouds"){
    weathericon.src="images/clouds.png";

}else if(data.weather[0].main=="Clear"){
    weathericon.src="images/clear.png";

    
}
else if(data.weather[0].main=="Rain"){
    weathericon.src="images/rain.png";

    
}
else if(data.weather[0].main=="Drizzle"){
    weathericon.src="images/drizzle.png";

    
}
else if(data.weather[0].main=="Mist"){
    weathericon.src="images/mist.png";
}
document.querySelector(".weather").style.display
}

buttbox.addEventListener("click",()=>{
checkweather(searchbox.value);
})

