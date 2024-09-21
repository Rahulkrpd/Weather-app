// src/components/TemperatureToggle.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './TemperatureToggle.css';

const TemperatureToggle = ({ unit, onToggle }) => {
  return (
    <div className="temperature-toggle">
      <button 
        className={unit === 'metric' ? 'active' : ''} 
        onClick={() => onToggle('metric')}
      >
        &#176;C
      </button>
      <button 
        className={unit === 'imperial' ? 'active' : ''} 
        onClick={() => onToggle('imperial')}
      >
        &#176;F
      </button>
    </div>
  );
};

TemperatureToggle.propTypes = {
  unit: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default TemperatureToggle;
