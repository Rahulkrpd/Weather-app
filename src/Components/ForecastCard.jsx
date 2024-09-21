// src/components/ForecastCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './ForecastCard.css';

const ForecastCard = ({ day, allIcons, unit }) => {
  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const icon = allIcons[day.weather[0].icon] || "/assets/clear.png";

  return (
    <div className="forecast-card">
      <p className="forecast-day">{getDayOfWeek(day.dt_txt)}</p>
      <img src={icon} alt={day.weather[0].description} className="forecast-icon" />
      <p className="forecast-temp">
        {Math.round(day.main.temp_max)}&#176; / {Math.round(day.main.temp_min)}&#176; {unit === 'metric' ? 'C' : 'F'}
      </p>
    </div>
  );
};

ForecastCard.propTypes = {
  day: PropTypes.object.isRequired,
  allIcons: PropTypes.object.isRequired,
  unit: PropTypes.string.isRequired,
};

export default ForecastCard;
