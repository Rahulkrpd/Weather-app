import { useEffect, useState } from "react"
import SearchBar from "./Components/SearchBar";
import Temperature from "./Components/Temperature";
import CurrentWeather from "./Components/CurrentWeather";
import ForecastCard from "./Components/ForecastCard";



import clear_icon from './assets/clear.png'
import cloud_icon from './assets/cloud.png'
import drizzle_icon from "./assets/drizzle.png"
import rain_icon from "./assets/rain.png"
import snow_icon from "./assets/snow.png"
import thunder_icon from "./assets/thunderstome.png"


function App() {

  const [city, setCity] = useState('New York')
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState([])

  const [unit, setUnit] = useState('metric');


  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,

    "02d": cloud_icon,
    "02n": cloud_icon,

    "03d": cloud_icon,
    "03n": cloud_icon,

    "04d": drizzle_icon,
    "04n": drizzle_icon,

    "09d": rain_icon,
    "09n": rain_icon,

    "10d": rain_icon,
    "10n": rain_icon,

    "11d": thunder_icon,
    "11n": thunder_icon,


    "13d": snow_icon,
    "13n": snow_icon,

    "50d": cloud_icon,
    "50n": cloud_icon


  }



  const fetchWeatherData = async () => {
    try {

      const WeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${import.meta.env.VITE_API_ID}`


      const weatherResponse = await fetch(WeatherUrl)
      const weather = await weatherResponse.json()


      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${import.meta.env.VITE_API_ID}`;
      const forecastResponse = await fetch(forecastUrl);
      const forecast = await forecastResponse.json();


      if (!forecastResponse.ok) {
        throw new Error('Forecast data not available');
      }


      const dailyForecast = forecast.list.filter(reading => reading.dt_txt.includes("12:00:00")).slice(0, 5);

      setWeatherData(weather);
      setForecastData(dailyForecast);
      // console.log(dailyForecast)



      setWeatherData(weather);
      // console.log('Weather data', weatherData)



    } catch (error) {
      console.log('Error fetching weather data', error);
      alert("Could not fetch weather data")
    }
  }



  useEffect(() => {
    fetchWeatherData(city)
  }, [city, unit])


  const handlSearch = (searchedCity) => {
    setCity(searchedCity)
  }

  const handleToggle = (selectedUnit) => {
    setUnit(selectedUnit)
  }

  const convertWindSpeed = (speed) => {
    if (unit === 'metric') {
      return `${speed} m/s`
    }
    else {
      return `${speed} mph`
    }
  }



  return (
    <>
      <div className="app">
        <SearchBar onSearch={handlSearch} />


        {weatherData && (
          <>
            <CurrentWeather
              weatherData={weatherData}
              convertWindSpeed={convertWindSpeed}
              allIcons={allIcons}
              unit={unit}
            />

            <Temperature
              unit={unit}
              onToggle={handleToggle}
            />

            <div className="forecast">
              {forecastData.map((day, idx) => (
                <ForecastCard key={idx} day={day} allIcons={allIcons} unit={unit} />
              ))}
            </div>


          </>
        )}
      </div>

    </>

  )
}

export default App
