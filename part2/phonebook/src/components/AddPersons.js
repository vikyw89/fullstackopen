import React from "react"
import { useState, useEffect } from 'react'
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
  
      for (let person of persons) {
        if (person.name.toLowerCase() === newName.toLowerCase()) {
          if(window.confirm(`${newName} is already added to phonebook, replace the old number with the new one ?`)) {
            console.log('update', newPerson)
            personsServices
              .update(person.id, newPerson)
              .then (response => {
                setPersons(persons.map(element => element.id !== person.id ? element : response))
                setNotif({success:`Added ${newName}`})
                setNewName('')
                setNewNumber('')
                setTimeout(() => {
                  setNotif(null)
                },5000)
              })
              .catch(error => {
                console.log('error')
                setNotif({error:`Information of ${person.name} has already been removed from the server`})
                setPersons(persons.filter(n => n.name !== newName))
                setTimeout(()=> {
                  setNotif(null)
                },5000)
              })
            return
          } else {
            return
          }
        }
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