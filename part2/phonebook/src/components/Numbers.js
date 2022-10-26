import React from "react"
import personsServices from '../services/persons'

const Numbers = ({personsToShow, setPersons, persons, setNotif}) => {
  const handleClick = (id,name) => {
    console.log('handleClick')

    if(window.confirm(`Delete ${name} ?`)) {
      personsServices
        .deleteData(id)
        .then (response => {
          setPersons(persons.filter(n => n.id !== id))
          setNotif({success:`Information of ${name} removed from the server`})
          setTimeout(()=> {
            setNotif(null)
          },5000)
        })
        .catch(error => {
          console.log('error')
          setNotif({error:`Information of ${name} has already been removed from the server`})
          setPersons(persons.filter(n => n.id !== id))
          setTimeout(()=> {
            setNotif(null)
          },5000)
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
              <button onClick={() => handleClick(element.id, element.name)}>delete</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Numbers