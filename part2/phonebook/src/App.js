import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1,
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  const HandleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const HandleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={HandleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={HandleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(element => {
          console.log('element', element)
          return (
            <div key={element.id}>
              {element.name} {element.number}
            </div>
          )
        })}
      </div>
    </div>
  )
}



export default App