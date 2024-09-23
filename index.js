import dotenv from 'dotenv'
import * as utils from 'utils.js'
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
    place: data.resolvedAddress,
    temp: utils.farenheitToCelcius(data.days[0].temp),
    tempMin: utils.farenheitToCelcius(data.days[0].tempmin),
    tempMax: utils.farenheitToCelcius(data.days[0].tempmax),
    feelsLike: utils.farenheitToCelcius(data.days[0].feelslike),
    date: data.days[0].datetime,
    weatherDesc: data.days[0].conditions,
    precipChance: data.days[0].precipprob,
    windSpeed: data.days[0].windspeed,
    windDirec: data.days[0].winddir,
  }
}

const renderData = (data) => {

}


getWeather('')

