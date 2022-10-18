import axios from 'axios'
import { useState, useEffect } from 'react';

function App() {
  const [countries, setCountries] = useState([])

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

  const showCountries = countries
  return (
    <div>
      <div>
        find countries <input/>
      </div>
      <div>
        {countries.map(element => {
          return (
            <div>
              {element}
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default App;
