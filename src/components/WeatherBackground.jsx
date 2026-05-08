export default function WeatherBackground({ condition, icon }) {
  const isCloudy = condition?.toLowerCase().includes('cloud');
  const isRainy = condition?.toLowerCase().includes('rain') || condition?.toLowerCase().includes('drizzle');
  const isClear = condition?.toLowerCase().includes('clear');
  const isHaze = condition?.toLowerCase().includes('haze') || condition?.toLowerCase().includes('mist');
  const isSnow = condition?.toLowerCase().includes('snow');
  const isNight = icon?.endsWith('n');

  return (
    <div className={`weather-bg-container ${isNight ? 'night-theme' : 'day-theme'}`}>
      {/* Stars for Night */}
      {isNight && (
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <motion.div 
              key={i}
              className="star"
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3}px`,
                height: `${Math.random() * 3}px`
              }}
            />
          ))}
        </div>
      )}

      {/* Clouds Animation */}
      {isCloudy && (
        <>
          <motion.div className="floating-cloud cloud-1" animate={{ x: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity }} />
          <motion.div className="floating-cloud cloud-2" animate={{ x: [0, -40, 0] }} transition={{ duration: 20, repeat: Infinity }} />
        </>
      )}

      {/* Rain Animation */}
      {isRainy && (
        <div className="rain-container">
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              className="rain-drop"
              animate={{ y: [0, 1000], opacity: [0, 1, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: Math.random() * 2 }}
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      )}

      {/* Snow Animation */}
      {isSnow && (
        <div className="snow-container">
          {[...Array(30)].map((_, i) => (
            <motion.div 
              key={i}
              className="snow-flake"
              animate={{ y: [0, 1000], x: [0, Math.random() * 50 - 25, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 3 }}
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      )}

      {/* Sun/Clear Animation (Day only) */}
      {isClear && !isNight && (
        <motion.div 
          className="sun-glow"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      )}

      {/* Haze/Mist Animation */}
      {isHaze && (
        <motion.div 
          className="haze-layer"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      )}
    </div>
  );
}
