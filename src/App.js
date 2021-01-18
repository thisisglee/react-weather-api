import './App.css';
import { useEffect, useState } from 'react';
import City from './City'

function App() {

  //fetch api from openweather
  const API_KEY= '81f116db10a96a667b5ef9507da76523'

  
  const [city, setCity] = useState({})
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('toronto')

  useEffect(()=>{

    const getWeather = async ()=> {
      const reqAPI = `http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`
  
      const response = (await fetch(reqAPI)).json()
      const data = await response
      console.log(data)
      setCity(data)
    }


    getWeather()
  },[query])

  

  const updateSearch= e =>{
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
    setSearch('')
  }
  
  return (
    <div className="App">
      <div className="Search-bar">
        <form onSubmit={getSearch} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={updateSearch} />
          <button className="search-button" type="submit">Search</button>
        </form>
      </div>

      {Object.keys(city).length !== 0 ?  
        <City
          name={city.name}
          icon={`http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
          temp={city.main.temp}
          minTemp={city.main.temp_min}
          maxTemp={city.main.temp_max}
          feels_like={city.main.feels_like}
          humidity={city.main.humidity}
          wind={city.wind.speed}
          main={city.weather[0].main}
          description={city.weather[0].description}
        /> : 
        <div></div>}
      
    </div>
  );
}

export default App;
