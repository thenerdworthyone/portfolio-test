//WEATHER API
import dotenv from "dotenv";
dotenv.config();

const weatherForm = document.querySelector(".weatherapi");
const Cityinput = document.querySelector(".cityinput");
const Card = document.querySelector(".card");
const apiKey= process.env.API_KEY;
console.log(apiKey);



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
      displayError("Please Enter A REAL City.");
  }

});

async function getWeatherData(city){

}

function displayWeatherInfo(data){

}


function getWeatherEmoji(weatherId){

}


function displayError(message){

    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errordisplay");

    Card.textContent ="";
    Card.style.display = 'flex';
    Card.appendChild(errorDisplay);


}


