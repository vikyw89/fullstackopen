import { useState, useEffect } from 'react';
import axios from 'axios'
import AddPersons from './components/AddPersons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const myFilter = (props) => {
    if (props.name.toLowerCase().includes(newFilter.toLowerCase())) {
      return true
    } else {
      return false
    }
  }

  const personsToShow = persons.filter(myFilter)

  return (
    <div>
        <h2>Phonebook</h2>
        <Filter newFilter={newFilter} handleFilter={handleFilter} />

        <h3>add a new</h3>
        <AddPersons persons={persons} setPersons={setPersons}/>

        <h3>Numbers</h3>
        <Numbers personsToShow={personsToShow}/>
    </div>
  )
}

const Filter = ({newFilter, handleFilter}) => {
  return (
    <>
      <div>
        <p>
          filter shown with <input value={newFilter} onChange={handleFilter}/>
        </p>
      </div>
    </>
  )
}

const Numbers = ({personsToShow}) => {
  return (
    <>
      <div>
        {personsToShow.map(element => {
          return (
            <div key={element.id}>
              {element.name} {element.number}
            </div>
          )
        })}
      </div>
    </>
  )
}
export default App