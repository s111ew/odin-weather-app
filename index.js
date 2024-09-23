import dotenv from 'dotenv'
dotenv.config()

const API_KEY = process.env.API_KEY

const getWeather = async (location) => {
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/?key=${API_KEY}`
  try {
    const response = await fetch(url, {mode: 'cors'})
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error('Error:', error)
  }
}

getWeather('London')

