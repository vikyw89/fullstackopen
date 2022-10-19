import axios from 'axios'
import { useState, useEffect } from 'react';

const api_key = process.env.REACT_APP_API_KEY

const Display = ({showCountries}) => {
  console.log('Display')
  if (showCountries.length > 10) {
    return (
      <div>
          Too many matches, specify another filter
      </div>
    )
  }
  if ((showCountries.length > 1) && (showCountries.length <= 10)) {
    return (
      <>
        <ShowNames showCountries={showCountries}/>
      </>
    )
  }
  if (showCountries.length === 1 ) {
    return (
      <>
        <ShowDetail showCountries={showCountries}/>
      </>
    )
  }
}

const ShowNames = ({showCountries}) => {
  console.log('ShowNames')
  return (
    <>
      {showCountries.map((element, index) => {
        return (
          <DisplayMinimized key={index} element={element} index={index}/>
        )
      })}
    </>
  )
}

const DisplayMinimized = ({element, index}) => {
  console.log('DisplayMinimized', element, index)
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
      {element.name.common}
      <button onClick={()=> handleClick(index)}>
        {show === index ? 'hide': 'show'}
      </button>
      {show === index &&
        <ShowDetail showCountries={[element]}/>
      }
    </div>
  )
}

const ShowDetail = ({showCountries}) => {
  console.log('ShowDetail', showCountries)
  return (
    <>
      {showCountries.map(element => {
        return (
          <div key={element.name.common}>
            <h1>
              {element.name.common}
            </h1>
            <p>
              capital {element.capital}
              <br></br>
              area {element.area}
            </p>
            <h3>
              languages :
            </h3>
            <Languages language={element.languages}/>
            <br></br>
            <img src={element.flags.png} alt='flags'/>
            <WeatherDisplay capital={element.capital} />
          </div>
        )
      })}
    </>
  )
}

const WeatherDisplay = ({capital}) => {
  console.log('WeatherDisplay', capital)
  const [weather, setWeather] = useState([])

  const hookweather = () => {
    console.log('effect')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&APPID=${api_key}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
      })
  }

  useEffect(hookweather, [capital])
  console.log('weather', weather)
  console.log('capital', capital)
  return (
    <>
      <h3>
        Weather in {capital} :
      </h3>
      <p>
        temperature : {weather.main.temp}
      </p>
      <img src={`this one too`} alt='weather' />
    </>
  )
}

const Languages = ({language}) => {
  return (
    <>
      {Object.values(language).map(element => {
        return (
          <li key={element}>
            {element}
          </li>
        )
      })}
    </>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const showFilter = (props) => {
    if (props.name.common.toLowerCase().includes(filter.toLowerCase())){
      return true
    } else {
      return false
    }
  }

  const showCountries = countries.filter(showFilter)
  

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilter}/>
      </div>
      <div>
        <Display showCountries={showCountries}/>
      </div>
    </div>
  )
}


export default App;

