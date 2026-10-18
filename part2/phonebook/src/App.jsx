import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

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