import React from 'react';
import { Search, Navigation } from 'lucide-react';

export default function CitySearch({ city, setCity, onSearch, onMyLocation }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="search-container">
      <div className="search-pill">
        <Search size={20} className="search-icon" onClick={onSearch} />
        <input
          type="text"
          placeholder="weather Delhi"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <div className="search-actions">
          <Navigation 
            size={20} 
            className="location-icon" 
            onClick={onMyLocation}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
    </div>
  );
}
