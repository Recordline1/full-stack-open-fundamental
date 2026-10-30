import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from './services/phonebook'
import Notification from './components/Notification'
import Footer from './components/Footer'
import './index.css'
const App = () => {
  const [persons, setPersons] = useState(null)
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState({
    message: null, status: false
  })

  useEffect(() => {
    phoneService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])

  if (!persons) return null

  const notificationMessage = (messege, status, timeout = 5000) => {
    setErrorMessage({ message: messege, status: status })
    setTimeout(() => {
      setErrorMessage({ message: null, status: false })
    }, timeout)
  }
  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      name: name,
      number: number
    }
    const personExists = persons.find(person => person.name === newPerson.name)


    if (personExists) {
      if (!window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      )) return

      phoneService
        .update(personExists.id, { ...personExists, number })
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
          setName('')
          setNumber('')
        })
        .catch(error => {
          notificationMessage(`Failed to update ${personExists.name}`, false)
          console.log(error)
        })
      return
    }
    phoneService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        // or
        // setPersons([...persons, returnedPerson])
        notificationMessage(`Added ${returnedPerson.name}`, true)
        setName('')
        setNumber('')
      })
      .catch(error => {
        console.log(error.message)
        alert(error.message)
      })

  }

  const removePerson = (id) => {
    const person = persons.find(person => person.id === id)

    if (!window.confirm(`Delete ${person.name} ?`)) return

    phoneService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        if (error.response?.status === 404) {
          notificationMessage(`Information of ${person.name} has already been removed from server`, false)
          setPersons(persons.filter(n => n.id !== id))
        } else {
          notificationMessage(`Failed to delete ${person.name}`, false)
          console.log(error)
        }

      })
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>

      <h1>Phonebook</h1>
      <Notification message={errorMessage.message} status={errorMessage.status} />

      <Filter filter={filter} handleFilterChange={(e) => setFilter(e.target.value)} />

      <h3>Add a new number</h3>

      <PersonForm
        name={name}
        number={number}
        handleNameChange={setName}
        handleNumberChange={setNumber}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      <Persons persons={filteredPersons} removePerson={removePerson} />

      <Footer />
    </div>
  )
}

export default App