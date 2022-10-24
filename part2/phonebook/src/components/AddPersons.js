import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const AddPersons = ({persons, setPersons}) => {
    console.log('PersonForm')
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
  
    const handleNameChange = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
    }
  
    const handleNumberChange = (event) => {
      console.log(event.target.value)
      setNewNumber(event.target.value)
    }
  
    const addPerson = (event) => {
      console.log('addPerson')
      event.preventDefault()
  
      for (let element of persons) {
        if (element.name === newName) {
          alert(`${newName} is already added to phonebook`)
          return
        }
      }
      const personObject = {
        name: newName,
        number: newNumber
      }
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
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

export default AddPersons