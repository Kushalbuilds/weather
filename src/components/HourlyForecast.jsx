import React from 'react';
import { motion } from 'framer-motion';

export default function HourlyForecast({ forecast, timezone }) {
  const getLocalTime = (dt, offset) => {
    // dt is UTC in seconds, offset is seconds from UTC
    const date = new Date((dt + offset) * 1000);
    return date.getUTCHours();
  };

  const formatTime = (hour) => {
    const period = hour >= 12 ? 'pm' : 'am';
    const h = hour % 12 || 12;
    return `${h} ${period}`;
  };

  return (
    <div className="hourly-section">
      <div className="hourly-scroll-container">
        {forecast.map((item, index) => (
          <motion.div 
            key={item.dt}
            className="hourly-item"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <p className="hourly-time">
              {index === 0 ? 'Now' : formatTime(getLocalTime(item.dt, timezone))}
            </p>
            <img 
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} 
              alt={item.weather[0].description} 
              className="hourly-icon"
            />
            <p className="hourly-temp">{Math.round(item.main.temp)}°</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
