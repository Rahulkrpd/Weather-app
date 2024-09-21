// src/components/CurrentWeather.jsx
import React from 'react';
import PropTypes from 'prop-types';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';
import "./CurrentWeather.css"


const CurrentWeather = ({ weatherData, convertWindSpeed, allIcons, unit }) => {
  const icon = allIcons[weatherData.weather[0].icon] || "/assets/clear.png";
    

  return (
    <div className="current-weather">
      <img src={icon} alt={weatherData.weather[0].description} className="weather-icon" />
      <p className="temperature">
        {Math.round(weatherData.main.temp)}
        <span>&#176; {unit === 'metric' ? 'C' : 'F'}</span>
      </p>
      <p className="location">{weatherData.name}, {weatherData.sys.country}</p>
      <p className="weather-description">{weatherData.weather[0].description}</p>
      <div className="weather-details">
        <div className="detail">
          <img src={humidityIcon} alt="Humidity" className="detail-icon" />
          <div>
            <p>{weatherData.main.humidity}%</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className="detail">
          <img src={windIcon} alt="Wind Speed" className="detail-icon" />
          <div>
            <p>{convertWindSpeed(weatherData.wind.speed)}</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

CurrentWeather.propTypes = {
  weatherData: PropTypes.object.isRequired,
  convertWindSpeed: PropTypes.func.isRequired,
  allIcons: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired,
};

export default CurrentWeather;
