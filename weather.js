//WEATHER API

const weatherForm = document.querySelector(".weatherapi");
const Cityinput = document.querySelector(".cityinput");
const Card = document.querySelector(".card");




weatherForm.addEventListener("submit", async event=> {

  event.preventDefault();

  const city = Cityinput.value;

 if (city){
     try{
        const weatherData= await getWeatherData(city);
        displayWeatherInfo(weatherData);

     }
    catch (error){
        console.error(error);
        displayError(error);
    }

  }
  else{
      displayError("Please Enter A REAL City (invalid)");
  }

});

async function getWeatherData(city){
    const geoUrl=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=10&language=en&format=json`;

    const georesponse = await fetch(geoUrl);
    console.log(georesponse);
    if(!georesponse.ok){
        throw new Error("Could not fetch location data =C");

    };

    const geoData = await georesponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found.. GREAT >:C")

    };

    const { latitude, longitude, name, country } = geoData.results[0];

    const weatherUrl =  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code`
    
    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
        throw new Error('Weather Data has ran away! (failed to fetch weather)');
    }
    const weatherData = await weatherResponse.json();

    console.log(weatherResponse)




    return {
     city: name,
     country: country,
     temperature: weatherData.current.temperature_2m,
     humidity: weatherData.current.relative_humidity_2m,
     weatherCode: weatherData.current.weather_code
    };
    
    


}

function displayWeatherInfo(data){
    const {city, country, temperature, humidity, weatherCode} = data;
    
    Card.textContent = "";
    Card.style.display='flex';

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const HumidityDisplay = document.createElement("p");
    const contDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    cityDisplay.className = "citydisplay";
    tempDisplay.className = "tempdisplay";
    HumidityDisplay.className = "humiditydisplay";
    contDisplay.className = "conditiondisplay";
    emojiDisplay.className = "weatheremoji";



    cityDisplay.textContent = `${city}, ${country}`;
    tempDisplay.textContent  = `Temperature: ${temperature}°C`;
    HumidityDisplay.textContent = `Humidity: ${humidity}%`;
    contDisplay.textContent = getConditionText(weatherCode);
    emojiDisplay.textContent =` ${getWeatherEmoji(weatherCode)}`;

    Card.appendChild(cityDisplay);
    Card.appendChild(tempDisplay);
    Card.appendChild(HumidityDisplay);
    Card.appendChild(contDisplay);
    Card.appendChild(emojiDisplay);
}

function getConditionText(code) {
    if (code === 0) return "Clear";
    if (code <= 3) return "Partly Cloudy";
    if (code <= 48) return "Fog";
    if (code <= 67) return "Rain";
    if (code <= 77) return "Snow";
    if (code <= 99) return "Thunderstorm";
    return "Unknown";
}

function getWeatherEmoji(code){
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 99) return "⛈️";
    return "❓";
}


function displayError(message){

    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errordisplay");

    Card.textContent ="";
    Card.style.display = 'flex';
    Card.appendChild(errorDisplay);

}


