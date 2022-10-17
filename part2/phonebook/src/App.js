import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      id: 1
    }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    // validating input
    for (let element of persons) {
      console.log('element.name', element.name)
      if (element.name === newName) {
        alert(`${newName} is already added to phonebook`)
        return
      }
    }
    
    const personObject = {
      name: newName,
      id: persons.length+1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const HandleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={HandleNameChange}/>
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
              {element.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}



export default App