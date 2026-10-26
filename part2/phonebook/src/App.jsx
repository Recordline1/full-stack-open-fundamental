import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from './services/phonebook'
const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    phoneService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }, [])


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
          console.log(error)
          alert(`Failed to update ${name}`)
        })
      return
    }
    phoneService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        // or
        // setPersons([...persons, returnedPerson])        
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
          alert(
            `the person '${person.name}' was already deleted from server`
          )
          setPersons(persons.filter(n => n.id !== id))
        } else {
          console.log(error)
          alert(`Failed to delete ${person.name}`)
        }

      })
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>

      <h2>Phonebook</h2>

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

    </div>
  )
}

export default App