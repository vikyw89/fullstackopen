import React from "react"
import { useState } from 'react'
import personsServices from '../services/persons'

const AddPersons = ({persons, setPersons, setNotif}) => {
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
  
      const newPerson= {
        name: newName,
        number: newNumber
      }
  
      personsServices
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNotif({success:`Added ${newName}`})
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotif(null)
          },5000)
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
            <button type="submit" className="btn btn-secondary">add</button>
          </div>
        </form>
      </>
    )
  }

export default AddPersons