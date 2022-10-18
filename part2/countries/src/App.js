import axios from 'axios'
import { useState, useEffect } from 'react';

const Display = ({showCountries}) => {
  console.log('Display')
  var cases = []
  if (showCountries.length > 10) {
    cases = 'tooMany'
  }
  if ((showCountries.length > 1) && (showCountries.length <= 10)) {
    cases = 'several'
  }
  if (showCountries.length === 1 ) {
    cases = 'onlyOne'
  }

  return (
    <>
      {cases === 'tooMany' &&
        <div>
          Too many matches, specify another filter
        </div>
      }

      {cases === 'several' &&
        <ShowNames showCountries={showCountries}/>
      }

      {cases === 'onlyOne' &&
        <ShowDetail showCountries={showCountries}/>
      }
    </>
  )
}

const ShowNames = ({showCountries}) => {
  return (
    <>
      {showCountries.map(element => {
        return (
          <div key={element.name.common}>
            {element.name.common}
          </div>
        )
      })}
    </>
  )
}

const ShowDetail = ({showCountries}) => {
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
          </div>
        )
      })}
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

