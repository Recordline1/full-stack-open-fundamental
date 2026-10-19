import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
  ])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      id: name,
      name: name,
      number: number
    }
    const personExists = persons.some(person => person.name === newPerson.name)

    if (personExists) {
      alert(`${newPerson.name} is already added to phonebook`)
      setName('')
      return
    }
    setPersons(prevPersons => prevPersons.concat(newPerson))
    setName('')
    setNumber('')
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

      <Persons persons={filteredPersons} />

    </div>
  )
}

export default App