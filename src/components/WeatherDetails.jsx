import React, { useState } from 'react';
import { Wind, Droplets, CloudRain, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WeatherDetails({ weather, aqi, forecast }) {
  const [expandedSection, setExpandedSection] = useState(null);

  // Calculate US-style AQI (0-500) based on PM2.5
  const calculateAQI = (pm25) => {
    if (!pm25) return 0;
    if (pm25 <= 12.0) return Math.round((50 / 12.0) * pm25);
    if (pm25 <= 35.4) return Math.round(((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51);
    if (pm25 <= 55.4) return Math.round(((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101);
    if (pm25 <= 150.4) return Math.round(((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151);
    if (pm25 <= 250.4) return Math.round(((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201);
    if (pm25 <= 350.4) return Math.round(((400 - 301) / (350.4 - 250.5)) * (pm25 - 250.5) + 301);
    return Math.round(((500 - 401) / (500.4 - 350.5)) * (pm25 - 350.5) + 401);
  };

  const aqiVal = aqi ? calculateAQI(aqi.components.pm2_5) : 0;

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const details = [
    { 
      id: 'precipitation',
      icon: <CloudRain size={20} />, 
      label: 'Precipitation', 
      value: `${weather.clouds.all}%`,
      chartLabel: "Cloud cover trend",
      data: forecast?.map(f => f.clouds.all) || []
    },
    { 
      id: 'wind',
      icon: <Wind size={20} />, 
      label: 'Wind', 
      value: `${Math.round(weather.wind.speed * 3.6)} kph`,
      chartLabel: "Wind speed trend (kph)",
      data: forecast?.map(f => Math.round(f.wind.speed * 3.6)) || []
    },
    { 
      id: 'humidity',
      icon: <Droplets size={20} />, 
      label: 'Humidity', 
      value: `${weather.main.humidity}%`,
      chartLabel: "Humidity trend",
      data: forecast?.map(f => f.main.humidity) || []
    },
    { 
      id: 'aqi',
      icon: <ShieldCheck size={20} />, 
      label: 'Air quality', 
      value: `${aqiVal}`,
      isAqi: true
    },
  ];

  return (
    <div className="details-section">
      {details.map((detail) => (
        <div key={detail.id} className="detail-item-container">
          <div className="detail-row" onClick={() => toggleSection(detail.id)} style={{ cursor: 'pointer' }}>
            <div className="detail-icon-wrapper">
              {detail.icon}
            </div>
            <div className="detail-info">
              <span className="detail-label">{detail.label}</span>
              <span className="detail-dot">·</span>
              <span className="detail-value">{detail.value}</span>
            </div>
            {expandedSection === detail.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>

          <AnimatePresence>
            {expandedSection === detail.id && (
              <motion.div 
                className="detail-expansion"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {detail.isAqi ? (
                  <div className="aqi-expansion-content">
                    <div className="aqi-header">
                      <span className="aqi-large-val">{aqiVal}</span>
                      <span className="aqi-large-text">Air quality</span>
                    </div>
                    <div className="aqi-scale-container">
                      <div className="aqi-scale-bar"></div>
                      <motion.div 
                        className="aqi-scale-indicator"
                        initial={{ left: 0 }}
                        animate={{ left: `${Math.min((aqiVal / 500) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="aqi-labels">
                      <span>0</span><span>50</span><span>100</span><span>150</span><span>200</span><span>250+</span>
                    </div>
                  </div>
                ) : (
                  <div className="trend-expansion-content">
                    <p className="trend-label">{detail.chartLabel}</p>
                    <div className="mini-chart">
                      {detail.data.map((val, i) => (
                        <div key={i} className="chart-column">
                          <span className="chart-val">{val}%</span>
                          <div 
                            className="chart-bar" 
                            style={{ height: `${val}%` }}
                          />
                          <span className="chart-time">
                            {i === 0 ? 'Now' : i*3 + 'h'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
