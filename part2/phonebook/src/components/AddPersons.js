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

    //check if the same name is available
    if ((persons.filter( person => person.name === newName).length === 0)) {
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
    } else {
      if(window.confirm(`${newName} already exists in contact, would you like to update it?`)) {
        const [oldPerson] = persons.filter( person => person.name === newName)
        personsServices
          .update(oldPerson.id, newPerson)
          .then(response => {
            setPersons(persons.map(person => person.id !== response.id ? person : response))
            setNotif({success:`${oldPerson.name}'s phone number has been updated`})
            setNewName('')
            setNewNumber('')
            setTimeout(() => {
              setNotif(null)
            },5000)
          })
      } else {
      }
    }
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