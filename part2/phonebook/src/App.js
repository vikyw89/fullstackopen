import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    console.log('addPerson')
    event.preventDefault()

    // Validating Input
    for (let element of persons) {
      if (element.name === newName) {
        alert(`${newName} is already added to phonebook`)
        return
      }
    }
    const personObject = {
      id: persons.length+1,
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const filterResult = (event) => {
    console.log('filterResult')
    let temp = []
    for (var element of persons) {
      let db = element.name.toLowerCase()
      if (db.includes(newFilter.toLowerCase())) {
        temp.push(element)
      }
    }
    console.log('return', temp)
    return temp
  }

  const personsToShow = filterResult()

  return (
    <div>
        <h2>Phonebook</h2>
        <Filter newFilter={newFilter} handleFilter={handleFilter} />

        <h3>add a new</h3>
        <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>

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

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
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