import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [str, setStr] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageType, setMessageType] = useState("notification")

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
  /*console.log('render', persons.length, 'persons')*/

  const handleStrChange = (event) => {
    /*console.log(event.target.value)*/
    const value = event.target.value
    setStr(value)
    value.length > 0 ? setShowAll(false) : setShowAll(true)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }



    let result = persons.find(e => e.name === newName)

    if (!result) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setErrorMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })

    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        console.log("muokataan numeroa ", result.id, result.name, result.number, `importance of ${result.id} needs to be toggled`)
        const personO = persons.find(p => p.id === result.id)
        const changedPerson = { ...personO, number: newNumber }
        personService.update(personO.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personO.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
           
            setErrorMessage(
              `The number of ${returnedPerson.name} modified, new number ${returnedPerson.number}`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
          }).catch(error => {
            setMessageType("error")
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
            setTimeout(() => {
              setErrorMessage(null)
              setMessageType("notification")
            }, 2000) 
             setPersons(persons.filter(p => p.name !== newName))
             
          });


      }
    }
  }

  const delFun = (id, name) => {
    console.log("delete: ", id)
    if (window.confirm(`Delete ${name} ?¸`)) {

      personService.deletea(id).then(response => {
        console.log("resp ", response)
        console.log(`Deleted post with ID ${id}`);
        setPersons(persons.filter(person => person.id != id))
        setErrorMessage(
          `Deleted ${response.name}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
        .catch(error => {
                   
          setPersons(persons.filter(p => p.id !== id))
        });

    }
  }

  const handlePersonChange = (event) => {
    /*console.log(event.target.value)*/
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    /*console.log(event.target.value)*/
    setNewNumber(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={messageType} />

      <Filter str={str} handleStrChange={handleStrChange} />

      <h3>Add a new</h3>

      <PersonForm newName={newName} newNumber={newNumber} addPerson={addPerson} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} />

      <h3>Numbers</h3>
      <Persons showAll={showAll} persons={persons} str={str} delFun={delFun} />

    </div>
  )

}

export default App