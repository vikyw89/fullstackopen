import axios from 'axios'
import { useState, useEffect } from 'react';

const api_key = process.env.REACT_APP_API_KEY

function App() {
  const [filter, setFilter] = useState('')

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilter}/>
      </div>
      <div>
        <Display filter={filter}/>
      </div>
    </div>
  )
}

const Display = ({filter}) => {
  console.log('Display')
  const [countries, setCountries] = useState()

  useEffect(() => {
    console.log('fetchingCountries')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('countriesFetched')
        setCountries(response.data)
      })
  }, [])

  if (!countries) {return null}

  const showFilter = (props) => {
    if (props.name.common.toLowerCase().includes(filter.toLowerCase())){
      return true
    } else {
      return false
    }
  }

  const countryList = countries.filter(showFilter)
  
  if (countryList.length > 10) {
    return (
      <>
          Too many matches, specify another filter
      </>
    )
  }
  if ((countryList.length > 1) && (countryList.length <= 10)) {
    return (
      <>
        {countryList.map((country, index) => (
          <DisplayMinimized key={index} country={country} index={index}/>
        ))}
      </>
    )
  }
  if (countryList.length === 1 ) {
    return (
      <>
        <DisplayMaximized country={countryList[0]}/>
      </>
    )
  }
}


const DisplayMinimized = ({country, index}) => {
  console.log('DisplayMinimized', country, index)
  const [show, setShow] = useState(-1)
  const handleClick = (index) => {
    if (index===show) {
      setShow(-1)
    } else {
      setShow(index)
    }
  } 
  return (
    <div>
      {country.name.common}
      <button onClick={()=> handleClick(index)}>
        {show === index ? 'hide': 'show'}
      </button>
      {show === index &&
        <DisplayMaximized country={country}/>
      }
    </div>
  )
}

const DisplayMaximized = ({country}) => {
  console.log('DisplayMaximized', country)
  return (
    <div>
      <h1>
        {country.name.common}
      </h1>
      <p>
        capital {country.capital}
        <br></br>
        area {country.area}
      </p>
      <h3>
        languages :
      </h3>
      <Languages language={country.languages}/>
      <br></br>
      <img src={country.flags.png} alt='flags'/>
      <DisplayWeather capital={country.capital} />
    </div>
  )
}


const DisplayWeather = ({capital}) => {
  console.log('DisplayWeather', capital)
  const [weather, setWeather] = useState()

  useEffect(() => {
    console.log('fetchingWeather')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&APPID=${api_key}`)
      .then(response => {
        console.log('weatherFetched')
        setWeather(response.data)
      })
  }, [capital])

  if (!weather) { return null }

  return (
    <>
      <h3>
        Weather in {capital} :
      </h3>
      <p>
        temperature {weather.main.temp} °C
      </p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather' />
      <p>
        wind {weather.wind.speed } m/s
      </p>
    </>
  )
}

const Languages = ({language}) => {
  return (
    <>
      {Object.values(language).map(element => (
          <li key={element}>
            {element}
          </li>
      ))}
    </>
  )
}

export default App;

