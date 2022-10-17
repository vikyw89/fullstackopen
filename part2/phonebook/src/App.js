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
  const [filter, setNewFilter] = useState('')

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

  const HandleFilter = (event) => {
    console.log('HandleFilter')
    setNewFilter(event.target.value)
  }

  const filterResult = () => {
    console.log('filterResult')
    let temp = []
    for (var element of persons) {
      let db = element.name.toLowerCase()
      if (db.includes(filter.toLowerCase())) {
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
      <div>
        <p>
          filter shown with <input value={filter} onChange={HandleFilter}/>
        </p>
      </div>
      <h2>add a new</h2>
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
        {personsToShow.map(element => {
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