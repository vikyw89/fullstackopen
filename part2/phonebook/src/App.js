import { useState, useEffect } from 'react'
import personsServices from './services/persons'
import './index.css'
import Numbers from './components/Numbers'
import Notifications from './components/Notifications'
import AddPersons from './components/AddPersons'
import Filter from './components/Filter'

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
        <Notifications notif={notif} />
        <Filter newFilter={newFilter} handleFilter={handleFilter}/>

        <h2>add a new</h2>
        <AddPersons persons={persons} setPersons={setPersons} setNotif={setNotif}/>

        <h2>Numbers</h2>
        <Numbers personsToShow={personsToShow} setPersons={setPersons} persons={persons} setNotif={setNotif}/>
    </div>
  )
}


export default App