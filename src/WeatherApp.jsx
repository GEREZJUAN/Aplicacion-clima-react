import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

  const [city, setCity] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  

  const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
  const API_KEY = 'API_KEY'
  const difKelvin = 273.15 // para obtener los grados celsious debemos restar los numero de los grados Kelvin


  const fetchWeatherData = async () =>{
    try{
      const response = await fetch (`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`) 
      const data = await response.json()
      console.log(data)
      setWeatherData(data)
    } catch(error){
      console.error ('Ha habido un error: ', error) 
    }
  }

  const hadleCityChange = (event) => {
    setCity(event.target.value)
  }

  const hadleSumit = (event) =>{
    event.preventDefault()
    fetchWeatherData()
  }


  return (
    <div className = "container">

    <h1>Aplicacion de Clima </h1>
    <form onSubmit={hadleSumit}>
      <input
       type="text"
       placeholder="Ingresa una cuidad"
       value={city}
       onChange={hadleCityChange}
       />
      <button type="submit">Buscar</button>
    </form>

    {weatherData && (

      <div>
        <h2>{weatherData.name},{weatherData.sys.country}</h2>
        <p>La temperatura es {Math.floor (weatherData.main.temp - difKelvin)}°C</p>
        <p>La condicion meteorológica actual es: {weatherData.weather[0].description}</p>
        <img 
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        alt={weatherData.weather[0].description}
        />
      </div>
      
    )}


   

    </div>
  )
}
