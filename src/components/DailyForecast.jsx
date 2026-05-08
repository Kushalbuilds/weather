import React from 'react';
import { motion } from 'framer-motion';

export default function DailyForecast({ forecast }) {
  // Filter forecast to get one entry per day (around noon)
  const dailyData = forecast.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 5);

  return (
    <div className="daily-section">
      <div className="daily-scroll-container">
        {dailyData.map((day, index) => (
          <motion.div 
            key={day.dt}
            className="daily-item"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <p className="daily-day">
              {new Date(day.dt * 1000).toLocaleDateString([], { weekday: 'short' })}
            </p>
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} 
              alt={day.weather[0].description} 
              className="daily-icon"
            />
            <div className="daily-temps">
              <span className="max-temp">{Math.round(day.main.temp_max)}°</span>
              <span className="min-temp">/{Math.round(day.main.temp_min)}°</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
