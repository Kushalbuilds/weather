import React, { useState, useEffect } from 'react';
import { getWeatherByCity, getForecastByCity, getAirQualityByCoords, getWeatherByCoords, getForecastByCoords } from './api/weather';
import WeatherCard from './components/WeatherCard';
import CitySearch from './components/CitySearch';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherDetails from './components/WeatherDetails';
import WeatherBackground from './components/WeatherBackground';
import './styles.css';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeatherData = async (params) => {
    setLoading(true);
    try {
      let currentData, forecastData;
      
      if (params.lat && params.lon) {
        currentData = await getWeatherByCoords(params.lat, params.lon);
        forecastData = await getForecastByCoords(params.lat, params.lon);
      } else {
        currentData = await getWeatherByCity(params.city);
        forecastData = await getForecastByCity(params.city);
      }

      const aqiData = await getAirQualityByCoords(currentData.coord.lat, currentData.coord.lon);
      
      setWeather(currentData);
      setForecast(forecastData);
      setAqi(aqiData.list[0]);
      setCity(currentData.name);
    } catch (error) {
      console.error(error);
      alert('City not found or API error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load: Try geolocation, fallback to Delhi
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherData({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        () => {
          fetchWeatherData({ city: 'Delhi' });
        }
      );
    } else {
      fetchWeatherData({ city: 'Delhi' });
    }

    // Auto-refresh every 30 minutes
    const interval = setInterval(() => {
      if (weather) {
        fetchWeatherData({ city: weather.name });
      }
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherData({ city });
    }
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeatherData({ lat: position.coords.latitude, lon: position.coords.longitude });
      });
    }
  };

  return (
    <div className="app-container">
      <WeatherBackground condition={weather?.weather[0].main} />
      <div className="content-wrapper">
        <CitySearch 
          city={city} 
          setCity={setCity} 
          onSearch={handleSearch} 
          onMyLocation={handleMyLocation} 
        />
        
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <>
            {weather && <WeatherCard weather={weather} />}
            {forecast && <HourlyForecast forecast={forecast.list.slice(0, 8)} timezone={weather?.timezone} />}
            {forecast && <DailyForecast forecast={forecast.list} />}
            {weather && <WeatherDetails weather={weather} aqi={aqi} forecast={forecast?.list.slice(0, 8)} />}
          </>
        )}
      </div>
    </div>
  );
}
