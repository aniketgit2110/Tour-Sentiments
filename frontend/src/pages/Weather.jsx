import React, { useState, useEffect } from "react";
import "../styles/weather.css";

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1; // Note: January is 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const getMaxDate = () => {
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 10);
    return maxDate.toISOString().split('T')[0];
  };

  // Debounce function to limit API requests
  const debounce = (func, delay) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  };

  const debouncedFetchData = debounce(fetchData, 500);

  async function fetchData() {
    const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${city}&format=json&u=f`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3150ddf5f0mshb0a68ea71f1ee45p1cf02ajsn1f084f7d085a',
        'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setWeatherData(result);
      console.log(result);
    } catch (error) {
      console.error(error);
      setWeatherData({ message: 'Internal Server Error' });
    }
  }

  const handleInputChange = (event) => {
    setCity(event.target.value || '');
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const filterForecastsByDate = () => {
    if (!weatherData || !startDate || !endDate) {
      return [];
    }

    const startTimestamp = new Date(startDate).getTime() / 1000;
    const endTimestamp = new Date(endDate).getTime() / 1000;

    return weatherData.forecasts.filter(
      (forecast) => forecast.date >= startTimestamp && forecast.date <= endTimestamp
    );
  };

  return (
    <div className="Weather">
        <div className="head">
          <input
            type="text"
            id="input"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
          />
          <input
            type="date"
            id="input"
            value={startDate}
            onChange={handleStartDateChange}
            max={getMaxDate()}
          />
          <input
            type="date"
            id="input"
            value={endDate}
            onChange={handleEndDateChange}
            max={getMaxDate()} 
          />
          <button id="search" onClick={debouncedFetchData}>Search</button>
        </div>

      {weatherData && <div className="name">
        <div className="city">{weatherData && weatherData.location.city} </div>
        <div className="country">{weatherData && weatherData.location.country}</div>
      </div>}
      {weatherData && <div className="name">
        <div className="icon"><img src={weatherData && weatherData.current_observation.condition.text == "Clear" || weatherData.current_observation.condition.text == "Sunny" ? "https://cdn0.iconfinder.com/data/icons/season-outline-filled/614/12_-_Sunny-1024.png": weatherData.current_observation.condition.text.includes("Cloudy") || weatherData.current_observation.condition.text.includes("Haze") ? "https://clipart-library.com/images/gTe5B6bac.png" : weatherData.current_observation.condition.text.includes("Rainy") || weatherData.current_observation.condition.text.includes("Thunderstorms") || weatherData.current_observation.condition.text.includes("Showers")? "https://th.bing.com/th/id/R.f34389ddbc4136107b1846fab06c0772?rik=g5jHS0dHuPXsJg&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2017%2f03%2fThunderstorm-Transparent.png&ehk=JRKKVrf%2flMC3sKyDuI5B7ZCLoCkVc1zMVfjie%2fxch6I%3d&risl=&pid=ImgRaw&r=0" : weatherData.current_observation.condition.text.includes("Snow") ? "https://cdn.icon-icons.com/icons2/857/PNG/512/weather-snow_snowing_icon-icons.com_67738.png" :"" } alt=""  /></div>
        <div className="city">{weatherData && ((weatherData.current_observation.condition.temperature -32)*5/9).toFixed(2) }<span>°C</span></div>
      </div>}
      {weatherData && <div className="class">
        <div className="condition">{weatherData && weatherData.current_observation.condition.text}</div>
      </div>}

      <div className="row">
        <div className="part">
            <div className="heading">SunRise</div>
            <div className="component">
                <div className="icons"><img src="https://icon-library.com/images/sunrise-icon-png/sunrise-icon-png-25.jpg" alt="" /></div>
                <div className="value">{weatherData ? weatherData.current_observation.astronomy.sunrise : '-'}</div>
            </div>
        </div>
        <div className="part">
            <div className="heading">Sunset</div>
            <div className="component">
                <div className="icons"><img src="https://webstockreview.net/images/sunset-clipart-logo-4.png" alt="" /></div>
                <div className="value">{weatherData ? weatherData.current_observation.astronomy.sunset : '-'}</div>
            </div>
        </div>
        <div className="part">
            <div className="heading">Humidity</div>
            <div className="component">
                <div className="icons"><img src="https://pic.onlinewebfonts.com/svg/img_434060.png" alt="" /></div>
                <div className="value">{weatherData ? weatherData.current_observation.atmosphere.humidity : '-'}</div>
            </div>
        </div>
        <div className="part">
            <div className="heading">Wind</div>
            <div className="component">
                <div className="icons"><img src="https://icon-library.com/images/wind-icon-png/wind-icon-png-2.jpg" alt="" /></div>
                <div className="value">{weatherData ? ((weatherData.current_observation.wind.chill-32)*5/9).toFixed(2) : '-'}<span>°C</span></div>
            </div>
        </div>
        <div className="part">
            <div className="heading">Pressure</div>
            <div className="component">
                <div className="icons"><img src="https://cdn4.iconfinder.com/data/icons/weather-287/32/92-_pressure-_air-_wind-_weather-512.png" alt="" /></div>
                <div className="value">{weatherData ? weatherData.current_observation.atmosphere.pressure : '-'}<span>Pa</span></div>
            </div>
        </div>
      </div>

      <div className="name">Filtered days Forecast</div>
      <div className="days">
        {weatherData && filterForecastsByDate().map((forecast, index) => (
          <div className="day" key={index}>
            <div className="text">{forecast.day}</div>
            <div className="text">{formatDate(forecast.date)}</div>
            <div className="values">
              <div className="high">
                <div className="name">High</div>
                <div className="component">
                    <div className="icons"><img src="https://cdn-icons-png.flaticon.com/256/103/103945.png" alt="" /></div>
                  <div className="value">{weatherData ? ((forecast.high-32)*5/9).toFixed(0) : '-'}<span>°C</span></div>
                </div>
              </div>
              <div className="low">
                <div className="name">Low</div>
                <div className="component">
                    <div className="icons"><img src="https://th.bing.com/th/id/R.a45b05a4dff520683e50fbdddbf954d1?rik=29EgVWFot9fcXg&riu=http%3a%2f%2ffreevector.co%2fwp-content%2fuploads%2f2013%2f07%2f56122-themometer-with-low-temperature.png&ehk=ptWAgJv6FyrXVzswatW7WdoYg1zUamJlJYylZauWV1g%3d&risl=&pid=ImgRaw&r=0" alt="" /></div>
                  <div className="value">{weatherData ? ((forecast.low-32)*5/9).toFixed(0) : '-'}<span>°C</span></div>
                </div>
              </div>
            </div>
            <div className="text">{forecast.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Weather;