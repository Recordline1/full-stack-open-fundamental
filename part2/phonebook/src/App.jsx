import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (e) => {
    e.preventDefault()
    const newPerson = {
      id: Date.now(),
      name: newName,
      number: number
    }
    const personExists = persons.some(person => person.name === newPerson.name)

    if (personExists) {
      alert(`${newPerson.name} is already added to phonebook`)
      setNewName('')
      return
    }
    setPersons(prevPersons => prevPersons.concat(newPerson))
    setNewName('')
    setNumber('')
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter showen with:
         <input
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          />
         </div>
      <form onSubmit={addPerson}>
        <h3>Add a new number</h3>
        <div>
          name:
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div>
          number:
          <input
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.length > 0 ? (
        <ul>
          {filteredPersons.map(person => (
            <li key={person.id}>name: {person.name} <br/> number: {person.number}</li>
          ))}
        </ul>
      ) : (
        <p>No persons in phonebook</p>
      )}

    </div>
  )
}

export default App