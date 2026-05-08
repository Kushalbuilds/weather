import React from 'react';
import { motion } from 'framer-motion';

export default function WeatherBackground({ condition }) {
  const isCloudy = condition?.toLowerCase().includes('cloud');
  const isRainy = condition?.toLowerCase().includes('rain') || condition?.toLowerCase().includes('drizzle');
  const isClear = condition?.toLowerCase().includes('clear');
  const isHaze = condition?.toLowerCase().includes('haze') || condition?.toLowerCase().includes('mist');

  return (
    <div className="weather-bg-container">
      {/* Clouds Animation */}
      {isCloudy && (
        <>
          <motion.div 
            className="floating-cloud cloud-1"
            animate={{ x: [0, 50, 0], y: [0, 10, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="floating-cloud cloud-2"
            animate={{ x: [0, -40, 0], y: [0, -15, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div 
            className="floating-cloud cloud-3"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          />
        </>
      )}

      {/* Rain Animation */}
      {isRainy && (
        <div className="rain-container">
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              className="rain-drop"
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 1000, opacity: [0, 1, 0] }}
              transition={{ 
                duration: 1 + Math.random(), 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 2
              }}
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      )}

      {/* Sun/Clear Animation */}
      {isClear && (
        <motion.div 
          className="sun-glow"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Haze/Mist Animation */}
      {isHaze && (
        <motion.div 
          className="haze-layer"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </div>
  );
}
