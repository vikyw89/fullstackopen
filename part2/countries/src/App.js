import axios from 'axios'
import { useState, useEffect } from 'react';

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

  const decideCondition = (props) => {
    console.log('decideCondition')
    if (props.length === 1) {
      return 'detail'
    }
    if (props.length > 10) {
      return 'too many'
    } else {
      return 'names'
    }
  }

  const condition = decideCondition(countries)
  

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilter}/>
      </div>
      <div>
        {showCountries.map(element => {
          return (
            <div key={element.name.common}>
              {element.name.common}
            </div>
          )
          })}
      </div>
    </div>
  )
}

export default App;
