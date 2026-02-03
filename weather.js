//WEATHER API
import dotenv from "dotenv";
dotenv.config();

const weatherForm = document.querySelector(".weatherapi");
const Cityinput = document.querySelector(".cityinput");
const Card = document.querySelector(".card");
const apiKey = process.env.API_KEY;




weatherForm.addEventListener("submit", event=> {

  event.preventDefault();

  const city = Cityinput.value;

  if (city){

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

    Card.textContext ="";
    Card.style.display = 'flex';
    Card.appendChild(errorDisplay);


}


