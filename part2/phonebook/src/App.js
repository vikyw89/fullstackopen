import { useState, useEffect } from 'react'
import personsServices from './services/persons'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [notif, setNotif] = useState('')

  useEffect(() => {
    personsServices
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

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
    <div className='container-sm p-3'>
        <h1>Phonebook</h1>
        <MessagePop notif={notif} />
        <Filter newFilter={newFilter} handleFilter={handleFilter}/>

        <h2>add a new</h2>
        <AddPersons persons={persons} setPersons={setPersons} setNotif={setNotif}/>

        <h2>Numbers</h2>
        <Numbers personsToShow={personsToShow} setPersons={setPersons} persons={persons}/>
    </div>
  )
}

const MessagePop = ({notif}) => {
  console.log('MessagePop', notif)
  if (!notif) {
    return
  }
  return (
    <div className="fs-4 alert alert-info">
        {notif}
    </div>
  )
}

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
              setNotif(`Added ${newName}`)
              setNewName('')
              setNewNumber('')
              setTimeout(() => {
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
        setNotif(`Added ${newName}`)
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
          <button type="submit" className="btn btn-primary">add</button>
        </div>
      </form>
    </>
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

const Numbers = ({personsToShow, setPersons, persons}) => {
  const handleClick = (id,name) => {
    console.log('handleClick')

    if(window.confirm(`Delete ${name} ?`)) {
      personsServices
      .deleteData(id)
      .then (response => {
        console.log('response', response)
        personsServices
          .getAll()
          .then (response => {
            setPersons(response)
          })  
      })
    } else {
      return
    }
  }

  return (
    <>
      <div>
        {personsToShow.map(element => {
          return (
            <div key={element.id}>
              {element.name} {element.number}
              <button onClick={() => handleClick(element.id, element.name)} value={element.id}>delete</button>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default App