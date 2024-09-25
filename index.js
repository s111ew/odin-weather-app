const API_KEY = 'SZFVC4TUXTGQS4SH6F48GUNEG'

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
    place: formatPlace(data.resolvedAddress),
    temp: farenheitToCelcius(data.days[0].temp),
    tempMin: farenheitToCelcius(data.days[0].tempmin),
    tempMax: farenheitToCelcius(data.days[0].tempmax),
    feelsLike: farenheitToCelcius(data.days[0].feelslike),
    date: formatDate(data.days[0].datetime),
    weatherDesc: data.days[0].conditions,
    precipChance: `${data.days[0].precipprob}%`,
    windSpeed: `${data.days[0].windspeed}km/h`,
    uvIndex: data.days[0].uvindex,
    humidity: data.days[0].humidity,
  }
}

const searchBox = {
  input: document.querySelector('input'),
  button: document.querySelector('button'),
}

const component = {
  city: document.querySelector(".city"),
  country: document.querySelector(".country"),
  date: document.querySelector(".date"),
  temp: document.querySelector(".temp"),
  max: document.querySelector(".max"),
  feels: document.querySelector(".feels"),
  min: document.querySelector(".min"),
  desc: document.querySelector(".description"),
  rain: document.querySelector(".rain"),
  humidity: document.querySelector(".humidity"),
  uvIndex: document.querySelector(".uv-index"),
  wind: document.querySelector(".wind"),
}

const renderData = (data) => {
  component.city.textContent = `${data.place[0]},`;
  component.country.textContent = data.place[1];
  component.date.textContent = data.date
  component.temp.textContent = data.temp
  component.max.textContent = data.tempMax
  component.feels.textContent = data.feelsLike
  component.min.textContent = data.tempMin
  component.desc.textContent = data.weatherDesc
  component.rain.textContent = data.precipChance
  component.humidity.textContent = data.humidity
  component.uvIndex.textContent = data.uvIndex
  component.wind.textContent = data.windSpeed
  changeBg(data.weatherDesc)
}

const addEventListeners = (input, button) => {
  button.addEventListener('click', () => {
    if (input.value && input.value !== ' ') {
      getWeather(input.value);
      input.value = ''
    }
  })
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      button.click()
    }
  })
}

window.onload = () => {
  addEventListeners(searchBox.input, searchBox.button);
  getWeather('London')
  getUserCoords()
}

const farenheitToCelcius = (temp) => {
  return ((temp - 32) * (5 / 9)).toFixed(1)
}

const formatPlace = (data) => {
  let places = data.split(',', 2)
  return [formatString(places[0]), formatString(places[1])]
}

const formatString = (str) => {
  str = str.trim().toLowerCase();
  if (str.includes(' ')) {
    let wordsList = str.split(' ');
    wordsList = wordsList.map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    );
    return wordsList.join(' ');
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const formatDate = (date) => {
  let rawDate = date.split('-');
  let day = rawDate[2]
  let month = getMonth(rawDate[1])
  let year = rawDate[0]

  return `${day} ${month} ${year}`
}

const getMonth = (n) => {
  switch (n) {
    case '01': return 'Jan';
    case '02': return 'Feb';
    case '03': return 'Mar';
    case '04': return 'Apr';
    case '05': return 'May';
    case '06': return 'Jun';
    case '07': return 'Jul';
    case '08': return 'Aug';
    case '09': return 'Sep';
    case '10': return 'Oct';
    case '11': return 'Nov';
    case '12': return 'Dec';
  }
}

const changeBg = (desc) => {
  const bg = document.querySelector('.background');
  let currentWeather = '';

  desc = desc.toLowerCase();
  
  if (desc.includes('rain')) {
    currentWeather = 'rain';
  } else if (desc.includes('partially cloudy')) {
    currentWeather = 'partially'
  } else if (desc.includes('cloud') || desc.includes('overcast')) {
    currentWeather = 'cloud';
  } else {
    currentWeather = 'sun';
  }

  if (currentWeather) {
    bg.style.backgroundImage = `url('./bg/bg-${currentWeather}.jpg')`;
  }
};

const getUserCoords = async () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      
      try {
        const city = await convertCoordToCity(latitude, longitude);
        
        if (!city) {
          console.error("City could not be determined from coordinates.");
          return;
        }
        
        getWeather(city);
      } catch (error) {
        console.error("Error getting city from coordinates:", error);
      }
    },
    (error) => {
      console.error("Error getting location", error);
    }
  );
};

const convertCoordToCity = async (lat, lon) => {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
  try {
    const response = await fetch(url, {mode: 'cors'})
    const location = await response.json()
    return location.address.city || location.address.town || location.address.village
  } catch(error) {
    console.error('Error Converting Location:', error)
  }
}

