import React from 'react';
import { motion } from 'framer-motion';

export default function WeatherCard({ weather }) {
  const lastUpdated = new Date(weather.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <motion.div 
      className="main-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="main-card-header">
        <div className="location-info">
          <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
          <span className="updated-time">Updated {lastUpdated}</span>
        </div>
        <span className="now-text">Now</span>
      </div>
      
      <div className="main-card-body">
        <div className="temp-section">
          <h1 className="main-temp">{Math.round(weather.main.temp)}°</h1>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} 
            alt={weather.weather[0].description} 
            className="main-weather-icon"
          />
        </div>
        
        <div className="condition-section">
          <h2 className="condition-text">{weather.weather[0].main}</h2>
          <p className="feels-like">Feels like {Math.round(weather.main.feels_like)}°</p>
        </div>
      </div>

      <div className="nature-graphic">
        {/* Placeholder for the nature graphic at the bottom of the card */}
        <div className="trees-background"></div>
      </div>
    </motion.div>
  );
}
