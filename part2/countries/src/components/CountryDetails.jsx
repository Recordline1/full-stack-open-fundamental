import { useState, useEffect } from 'react'
import axios from 'axios'
const CountryDetails = ({ country }) => {
  console.log(JSON.stringify(country, null, 2))
  const [weather, setWeather] = useState(null)
  const capital = country.capital?.[0]

  useEffect(() => {
    if (!capital) return

    setWeather(null)
    axios
      .get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          q: capital,
          appid: import.meta.env.VITE_WEATHER_KEY,
          units: 'metric'
        }
      })
      .then(response => setWeather(response.data))
      .catch(error => console.log(error))
  }, [capital])

  return (<div>
    <h2>{country.name.common}</h2>
    <p>Capital: {country.capital?.[0]}</p>
    <p>Area: {country.area}</p>
    <h3>Languages</h3>
    <ul>
      {Object.values(country.languages ?? {}).map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt} width="150" />
    {weather && (
      <div>
        <h3>Weather in {capital}</h3>
        <p>Temperature: {weather.main.temp} °C</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt={weather.weather[0].description}
        />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    )}
  </div>)
}


export default CountryDetails