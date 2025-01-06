import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Importing the CSS file

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'f855589c73fd0ee0f03e93ad611478ea'; 

  const handleSearch = async () => {
    if (!city) return;
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (error) {
      setWeather(null);
      setError('City not found. Please try again.');
    }
  };

  const handleReset = () => {
    setCity('');
    setWeather(null);
    setError('');
  };

  return (
    <div className="App">
      <h1 style={{color:'#3498db'}}>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Get Weather</button>

      <button onClick={handleReset} className="reset-btn">
        Reset
      </button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div>
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
