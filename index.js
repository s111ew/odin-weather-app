import dotenv from 'dotenv'
import * as utils from 'utils.js'
import { formatDate } from './utils'
dotenv.config()

const API_KEY = process.env.API_KEY

const getWeather = async (location) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`
  try {
    const response = await fetch(url, {mode: 'cors'})
    const weatherData = await response.json()
    const dataObject = dataObjectFrom(weatherData);
    renderData(dataObject)
  } catch (error) {
    console.error('Error:', error)
  }
}

const dataObjectFrom = (data) => {
  return {
    place: utils.formatPlace(data.resolvedAddress),
    temp: utils.farenheitToCelcius(data.days[0].temp),
    tempMin: utils.farenheitToCelcius(data.days[0].tempmin),
    tempMax: utils.farenheitToCelcius(data.days[0].tempmax),
    feelsLike: utils.farenheitToCelcius(data.days[0].feelslike),
    date: utils.formatDate(data.days[0].datetime),
    weatherDesc: data.days[0].conditions,
    precipChance: `${data.days[0].precipprob}%`,
    windSpeed: `${data.days[0].windspeed}km/h`,
    uvIndex: data.days[0].uvindex,
  }
}

const searchBox = {
  input: document.querySelector('input').value,
  button: document.querySelector('button'),
}

const component = {
  city: document.querySelector(".city").textContent,
  country: document.querySelector(".country").textContent,
  date: document.querySelector(".date").textContent,
  temp: document.querySelector(".temp").textContent,
  max: document.querySelector(".max").textContent,
  feels: document.querySelector(".feels").textContent,
  min: document.querySelector(".min").textContent,
  desc: document.querySelector(".description").textContent,
  rain: document.querySelector(".rain").textContent,
  humidity: document.querySelector(".humidity").textContent,
  uvIndex: document.querySelector(".uv-index").textContent,
  wind: document.querySelector(".wind").textContent,
}

const renderData = (data) => {

}


getWeather('')

